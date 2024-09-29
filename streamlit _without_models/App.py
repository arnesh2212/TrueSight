import streamlit as st
import pandas as pd
from transformers import (
    AutoModelForTokenClassification,
    AutoTokenizer,
    DataCollatorForTokenClassification,
)
import torch
import re
import random
from llama_cpp import Llama

# Use a pipeline as a high-level helper
from transformers import pipeline

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
pipe = pipeline("token-classification", model="output_mdeberta_base/checkpoint-320000" ,  aggregation_strategy="first" , device=device)


st.set_page_config(page_title="RE-DACT", page_icon="🔒", layout="wide")

llm = Llama.from_pretrained(
	repo_id="Qwen/Qwen2-0.5B-Instruct-GGUF",
	filename="qwen2-0_5b-instruct-fp16.gguf",
)



st.title("RE-DACT")
# h2
st.markdown("##### A tool to redact sensitive information from data, Powered by TrueSight")

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


# Text box for input
text = st.text_area("Enter text to redact", "")

# Multi-select for labels to redact
selected_labels = st.multiselect("Select labels to redact", list(entity_dict.keys()), list(entity_dict.keys()))

# Redaction degree options
degree_of_redaction = ["Full", "Partial", "Synthetic", "Scramble"]
selected_degree_of_redaction = st.selectbox("Select degree of redaction", degree_of_redaction)
to_show = []
for  label in selected_labels:
    to_show += entity_dict[label]
logs = []
# Redact button
if st.button("Redact"):
    if selected_degree_of_redaction == "Full" or selected_degree_of_redaction == "Partial":
        aggregate_redaction = selected_degree_of_redaction == "Full"
        


        redacted_text = ""
        for sen in text.split("."):
            out = pipe(sen+".")
            logs += out
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
                {text}
            </div>
        ''', unsafe_allow_html=True)
        st.write("Redaction complete. Please review the redacted text before sharing.")

    if selected_degree_of_redaction == "Scramble":
        aggregate_redaction = True
        scrambled_text = ""

        def scramble_word(word):
            # Scramble the word if it's more than one character
            return ''.join(random.sample(word, len(word))) if len(word) > 1 else word

        for sen in text.split("."):
            out = pipe(sen+".")
            logs += out
            for ent_gr  in out:
                entity_gr = "I-" + ent_gr['entity_group']

                if entity_gr in to_show:
                    text = text.replace(ent_gr['word'], scramble_word(ent_gr['word']))                    

        # Display scrambled text with rounded box, padding, and increased font size
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
                {text}
            </div>
        ''', unsafe_allow_html=True)
        st.write("Scrambling complete. Please review the scrambled text before sharing.")
    
    if selected_degree_of_redaction == "Synthetic": 
        aggregate_redaction = 0
        
        redacted_text = ""
        for sen in text.split("."):
            out = pipe(sen+".")
            logs += out 
            for ent_gr  in out:
                entity_gr = "I-" + ent_gr['entity_group']

                if entity_gr in to_show:
                    if len(ent_gr['word']) > 1:
                        word = ent_gr['word']
                        generatiion_prompt = f"Generate a random {ent_gr['entity_group']}, Only ouutput that and nothing else."
                        output = llm.create_chat_completion(
                            messages = [
                                {
                                    "role": "user",
                                    "content":  generatiion_prompt
                                }
                            ] , max_tokens=15 , temperature=0.6
                        )
                        if word[-1] == ".":
                            text = text.replace(word, output['choices'][0]['message']['content']+".")
                        else:
                            text = text.replace(word, output['choices'][0]['message']['content'])





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
                {text}
            </div>
        ''', unsafe_allow_html=True)


        st.write("Synthetic data generation complete. Please review the synthetic text before sharing.")

    st.text("Logs")
    st.write(logs)
    