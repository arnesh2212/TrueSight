import streamlit as st
import torch
from PIL import Image , ImageFilter
from transformers import (
    AutoModelForTokenClassification,
    AutoTokenizer,
    DataCollatorForTokenClassification,
    Trainer,
    TrainingArguments,
)
import numpy as np
import os
import cv2
import tempfile
import re
import pymupdf
from transformers import pipeline
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
pipe = pipeline("token-classification", model="output_mdeberta_base/checkpoint-320000" ,  aggregation_strategy="first" , device=device)

entity_dict = {
    "NAME": ['B-FIRSTNAME', 'I-FIRSTNAME', 'B-LASTNAME', 'I-LASTNAME', 'B-MIDDLENAME', 'I-MIDDLENAME'],
    "CITY": ['B-CITY', 'I-CITY'],
    "ZIPCODE": ['B-ZIPCODE', 'I-ZIPCODE'],
    "DATE": ['B-DATE', 'I-DATE'],
    "CREDITCARD": ['B-CREDITCARDISSUER', 'I-CREDITCARDISSUER', 'B-CREDITCARDNUMBER', 'I-CREDITCARDNUMBER', 'B-CREDITCARDCVV', 'I-CREDITCARDCVV'],
    "USERNAME": ['B-USERNAME', 'I-USERNAME'],
    "JOB": ['B-JOBTYPE', 'I-JOBTYPE', 'B-JOBTITLE', 'I-JOBTITLE', 'B-JOBAREA', 'I-JOBAREA'],
    "PREFIX": ['B-PREFIX', 'I-PREFIX'],
    "EMAIL": ['B-EMAIL', 'I-EMAIL'],
    "IP": ['B-IP', 'I-IP', 'B-IPV4', 'I-IPV4', 'B-IPV6', 'I-IPV6'],
    "PHONE": ['B-PHONENUMBER', 'I-PHONENUMBER', 'B-PHONEIMEI', 'I-PHONEIMEI'],
    "MAC": ['B-MAC', 'I-MAC'],
    "DOB": ['B-DOB', 'I-DOB'],
    "GPS": ['B-NEARBYGPSCOORDINATE', 'I-NEARBYGPSCOORDINATE'],
    "ADDRESS": ['B-BUILDINGNUMBER', 'I-BUILDINGNUMBER', 'B-STREET', 'I-STREET', 'B-SECONDARYADDRESS', 'I-SECONDARYADDRESS'],
    "BITCOIN": ['B-BITCOINADDRESS', 'I-BITCOINADDRESS'],
    "SSN": ['B-SSN', 'I-SSN'],
    "SEX": ['B-SEX', 'I-SEX', 'B-GENDER', 'I-GENDER'],
    "ACCOUNT": ['B-ACCOUNTNUMBER', 'I-ACCOUNTNUMBER', 'B-ACCOUNTNAME', 'I-ACCOUNTNAME'],
    "CURRENCY": ['B-CURRENCYSYMBOL', 'I-CURRENCYSYMBOL', 'B-CURRENCY', 'I-CURRENCY', 'B-AMOUNT', 'I-AMOUNT', 'B-CURRENCYCODE', 'I-CURRENCYCODE', 'B-CURRENCYNAME', 'I-CURRENCYNAME'],
    "IBAN": ['B-IBAN', 'I-IBAN'],
    "BIC": ['B-BIC', 'I-BIC'],
    "URL": ['B-URL', 'I-URL'],
    "PASSWORD": ['B-PASSWORD', 'I-PASSWORD'],
    "STATE": ['B-STATE', 'I-STATE'],
    "COUNTY": ['B-COUNTY', 'I-COUNTY'],
    "AGE": ['B-AGE', 'I-AGE'],
    "TIME": ['B-TIME', 'I-TIME'],
    "HEIGHT": ['B-HEIGHT', 'I-HEIGHT'],
    "EYECOLOR": ['B-EYECOLOR', 'I-EYECOLOR'],
    "COMPANYNAME": ['B-COMPANYNAME', 'I-COMPANYNAME'],
    "ETHEREUM": ['B-ETHEREUMADDRESS', 'I-ETHEREUMADDRESS'],
    "LITECOIN": ['B-LITECOINADDRESS', 'I-LITECOINADDRESS'],
    "VEHICLE": ['B-VEHICLEVRM', 'I-VEHICLEVRM', 'B-VEHICLEVIN', 'I-VEHICLEVIN'],
    "ORDINALDIRECTION": ['B-ORDINALDIRECTION'],
    "USERAGENT": ['B-USERAGENT', 'I-USERAGENT'],
    "PIN": ['B-PIN', 'I-PIN'],
    "MASKEDNUMBER": ['B-MASKEDNUMBER', 'I-MASKEDNUMBER'],
}



st.set_page_config(page_title="RE-DACT", page_icon="🔒", layout="wide")

st.markdown("### Upload Document (txt, pdf) for RE-DACTion")


#File Uploader
uploaded_file = st.file_uploader("Choose a file", type=["txt", "pdf"])


selected_labels = st.multiselect("Select labels to redact", list(entity_dict.keys()), list(entity_dict.keys()))

# Redaction degree options
degree_of_redaction = ["Full", "Partial"]
selected_degree_of_redaction = st.selectbox("Select degree of redaction", degree_of_redaction)
to_show = []
for  label in selected_labels:
    to_show += entity_dict[label]
#Redact button
if st.button("Redact"):
    if uploaded_file is not None:
        if uploaded_file.type == "text/plain":
            text = uploaded_file.getvalue().decode("utf-8")
            aggregate_redaction = selected_degree_of_redaction == "Full"
            
            for sen in text.split("."):
                out = pipe(sen+".")
                for ent_gr  in out:
                    print(ent_gr)
                    entity_gr = "I-" + ent_gr['entity_group']

                    if entity_gr in to_show:
                        if len(ent_gr['word']) > 1:
                            if selected_degree_of_redaction == "Full":
                                if ent_gr['word'][-1] == ".":
                                    text = text.replace(ent_gr['word'], "XXXXX.")
                                else:
                                    text = text.replace(ent_gr['word'], "XXXXX")
                            else:
                                if ent_gr['word'][-1] == ".":
                                    text = text.replace(ent_gr['word'], ent_gr['entity_group'] + ".")
                                else:
                                    text = text.replace(ent_gr['word'], ent_gr['entity_group'])

            redacted_text = text
            #Display 2 lines and ..
            st.markdown(f'''
            <div style="
            color: black;
            background-color: white;
            font-size: 18px;
            border-radius: 15px;
            padding: 20px;
            margin: 10px 0;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            ">
            {redacted_text[:500]}...
            </div>
            ''', unsafe_allow_html=True)
            st.write("Redaction complete. Please review the redacted text before sharing.")
            #Download button
            st.download_button(
                label="Download Redacted Text",
                data=redacted_text,
                file_name="redacted_text.txt",
                mime="text/plain",
            )



        elif uploaded_file.type == "application/pdf":
            #Temp
            temp_pdf = tempfile.NamedTemporaryFile(delete=False)
            temp_pdf.write(uploaded_file.getvalue())
            temp_pdf.close()
            uploaded_file = temp_pdf.name
            doc = pymupdf.open(uploaded_file)
            text = ""
            for page in doc:
                text += page.get_text()
            text = text.replace("\n", " ")
            aggregate_redaction = selected_degree_of_redaction == "Full"
            redacted_text = ""
            redacted_things = []
            for sen in text.split("."):
                out = pipe(sen+".")
                for ent_gr  in out:
                    print(ent_gr)
                    entity_gr = "I-" + ent_gr['entity_group']

                    if entity_gr in to_show:
                        if len(ent_gr['word']) > 1:
                            redacted_things.append(ent_gr['word'])



            for page in doc:
                # Find all instances of "Jane Doe" on the current page
                for thing2 in redacted_things:
                    thing = thing2

                    instances = page.search_for(thing)

                    # Redact each instance of "Jane Doe" on the current page
                    for inst in instances:
                        page.add_redact_annot(inst , fill=(0,0,0))

                    # Apply the redactions to the current page
                    page.apply_redactions(graphics=0)

                    # thing = " " + thing2 + "."
                    # instances = page.search_for(thing)

                    # # Redact each instance of "Jane Doe" on the current page
                    # for inst in instances:
                    #     page.add_redact_annot(inst , fill=(0,0,0))

                    # # Apply the redactions to the current page
                    # page.apply_redactions(graphics=0)

                    
        

            # Save the redacted PDF
            redacted_pdf = tempfile.NamedTemporaryFile(delete=False)
            doc.save(redacted_pdf.name)





            st.write("Redaction complete. Please review the redacted pdf before sharing.")

            #Download button
            st.download_button(
                label="Download Redacted PDF",
                data=open(redacted_pdf.name, "rb"),
                file_name="redacted_pdf.pdf",
                mime="application/pdf",
            )


            