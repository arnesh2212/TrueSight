import streamlit as st
import torch
from PIL import Image , ImageFilter
from transformers import AutoProcessor, AutoModelForZeroShotObjectDetection 
import numpy as np
import os
import cv2
st.set_page_config(page_title="RE-DACT", page_icon="🔒", layout="wide")
import tempfile

from deepface import DeepFace

backends = [
  'opencv', 
  'ssd', 
  'dlib', 
  'mtcnn', 
  'fastmtcnn',
  'retinaface', 
  'mediapipe',
  'yolov8',
  'yunet',
  'centerface',
]

alignment_modes = [True, False]

st.markdown("### Upload Video for RE-DACTion")

video = st.file_uploader("Choose a video...", type=["mp4", "avi", "mov" , "flv" ])
degree_of_redaction = ["Full" , "Blur" , "Pixelate"]

#Selectbox
redaction_grade = st.selectbox("Select the degree of redaction", degree_of_redaction)
#Empty
slide_bar = st.empty()
if redaction_grade == "Pixelate":
    pixelation = slide_bar.slider("Pixelation", 0.02, 0.3, 0.1)
if redaction_grade == "Blur":
    blur_level = slide_bar.slider("Blur", 30,100,50)


if st.button("Redact"):
    #Empty video placeholder
    vid = st.empty()
    empty_txt = st.empty()
    if video is not None:
        print("Video is not None")
        #Open video
        tfile = tempfile.NamedTemporaryFile(delete=False)
        tfile.write(video.read())

        cap = cv2.VideoCapture(tfile.name)
        frame_width = int(cap.get(3))
        frame_height = int(cap.get(4))

        #Check fps
        fps = cap.get(cv2.CAP_PROP_FPS)
        print(fps)

        out = cv2.VideoWriter('pages/output.mp4',0x7634706d, fps, (frame_width, frame_height))
        i = 0
        while(cap.isOpened()):
            ret, frame = cap.read()
            if ret == True:
                try:
                    obsj = DeepFace.extract_faces(
                        img_path = frame, 
                        detector_backend = backends[7],
                        align = alignment_modes[0],
                        
                    )

                    for obj in obsj:    
                        x,y,w,h = obj["facial_area"]['x'], obj["facial_area"]['y'], obj["facial_area"]['w'], obj["facial_area"]['h']
                        if redaction_grade == "Full":
                            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 0), -1)
                        if redaction_grade == "Blur":
                            if blur_level % 2 == 0:
                                blur_level += 1
                            face = frame[y:y+h, x:x+w]
                            face = cv2.GaussianBlur(face, (blur_level, blur_level), 30)
                            frame[y:y+h, x:x+w] = face

                        if redaction_grade == "Pixelate":
                            x, y, w, h = int(x), int(y), int(w), int(h)

                            roi = frame[y:y+h, x:x+w]

                            new_w = max(1, int(w * pixelation))  # Ensure non-zero width
                            new_h = max(1, int(h * pixelation))  # Ensure non-zero height

                            # Apply pixelation (downscaling)
                            pixelated_region = cv2.resize(roi, (new_w, new_h), interpolation=cv2.INTER_NEAREST)

                            # Resize back to the original size
                            pixelated_region = cv2.resize(pixelated_region, (w, h), interpolation=cv2.INTER_NEAREST)

                            # Replace the original region with the pixelated one
                            frame[y:y+h, x:x+w] = pixelated_region


                except Exception as e:
                    print (e)
                    pass
                out.write(frame)
                if i == 0:
                    empty_txt = st.markdown("#### Sample Frame, Processing video")
                    vid.image(frame, channels="BGR" , width=600)

                    i += 1
            else:
                break

        cap.release()
        out.release()
        cv2.destroyAllWindows()

        st.markdown("#### Download Redacted Video")



        btn = st.download_button(
            label="Download video",
            data=open("pages/output.mp4", "rb"),
            file_name="output.mp4",
            mime="video/mp4",
        )

        #Delet video from server
        delet_btn = st.button("Delete video")
        if delet_btn:
            os.remove("pages/output.mp4")
            os.remove(tfile.name)
            empty_txt.empty()
            vid.empty()
            st.empty()

                
        