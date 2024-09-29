import streamlit as st
import torch
from PIL import Image , ImageFilter
from transformers import AutoProcessor, AutoModelForZeroShotObjectDetection 
import numpy as np
import os
import cv2
import tempfile

st.set_page_config(page_title="RE-DACT", page_icon="🔒", layout="wide")

model_id = "IDEA-Research/grounding-dino-tiny"
device = "cuda" if torch.cuda.is_available() else "cpu"
processor = AutoProcessor.from_pretrained("IDEA-Research/grounding-dino-tiny")
model = AutoModelForZeroShotObjectDetection.from_pretrained("IDEA-Research/grounding-dino-tiny").to(device)

#Upload image
st.markdown("### Upload Image for RE-DACTion")
#Upload file
image = st.file_uploader("Choose an image...", type=["jpg", "png", "jpeg" , "bmp" ])
redaction_options = ['face' , 'eye' , 'text' , 'tattoo' , 'license plate' , 'person' , 'vehicle' , 'weapon' , 'clothing' , 'logo' , 'animal']

redaction = st.multiselect("Select the type of redaction", redaction_options)


#Multi-select

degree_of_redaction = ["Full" , "Blur" , "Pixelate"]

#Selectbox
redaction_grade = st.selectbox("Select the degree of redaction", degree_of_redaction)
#Empty
slide_bar = st.empty()
if redaction_grade == "Pixelate":
    pixelation = slide_bar.slider("Pixelation", 0.02, 0.3, 0.1)
if redaction_grade == "Blur":
    blur_level = slide_bar.slider("Blur", 30,100,50)

#Button
if st.button("Redact"):

    if image is not None:
        print("Image is not None")
        ## VERY important: text queries lneed to be lowercased + end with a dot
        queries = ""
        for i in redaction:
            queries += i + ". "
        image = Image.open(image)
        print(queries)
        # Perform zero-shot object detection
        inputs = processor(images=image, text=queries, return_tensors="pt").to(device)
        with torch.no_grad():
            outputs = model(**inputs)
        results = processor.post_process_grounded_object_detection(
            outputs,
            inputs.input_ids,
            box_threshold=0.4,
            text_threshold=0.4,
            target_sizes=[image.size[::-1]]
        )
        print(results)
        for result in results:
            
            i = 0
            for box in result["boxes"]:
                x1, y1, x2, y2 = box
                x1 = x1.cpu().numpy()
                y1 = y1.cpu().numpy()
                x2 = x2.cpu().numpy()
                y2 = y2.cpu().numpy()
                
                x, y, w, h = x1, y1, x2 - x1, y2 - y1
                print(x, y, w, h)
                image = np.array(image)
                print(degree_of_redaction)
                if redaction_grade == "Full":
                    #Black rectangle using opencv
                    image[int(y):int(y+h), int(x):int(x+w)] = 0
                elif redaction_grade == "Blur":
                    if blur_level % 2 == 0:
                        blur_level += 1
                    image[int(y):int(y+h), int(x):int(x+w)] = cv2.GaussianBlur(image[int(y):int(y+h), int(x):int(x+w)], (blur_level, blur_level), 0)

                elif redaction_grade == "Pixelate":

                    x, y, w, h = int(x), int(y), int(w), int(h)

                    roi = image[y:y+h, x:x+w]

                    new_w = max(1, int(w * pixelation))  # Ensure non-zero width
                    new_h = max(1, int(h * pixelation))  # Ensure non-zero height

                    # Apply pixelation (downscaling)
                    pixelated_region = cv2.resize(roi, (new_w, new_h), interpolation=cv2.INTER_NEAREST)

                    # Resize back to the original size
                    pixelated_region = cv2.resize(pixelated_region, (w, h), interpolation=cv2.INTER_NEAREST)

                    # Replace the original region with the pixelated one
                    image[y:y+h, x:x+w] = pixelated_region



            image_redact = Image.fromarray(image)
            #Save image
            
            #Temporary file redacted image
            with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmpfile:
                image_redact.save(tmpfile.name)
                st.image(image_redact, caption="Redacted Image")
                st.markdown("#### Download Redacted Image")
                btn = st.download_button(
                    label="Download image",
                    data=open(tmpfile.name, "rb"),
                    file_name="output.png",
                    mime="image/png",
                )
                


        if len(results[0]["boxes"]) == 0:
            st.error("No object found for redaction")   