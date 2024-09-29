# TrueSight: Gradational Redaction, Masking, and Anonymization Tool

**TrueSight** is an innovative NLP and Vision-based redaction tool that allows user-defined gradational redaction, masking, and anonymization across multiple input formats, including text, images, PDFs, and videos. TrueSight is designed for high security, ensuring that no input data is stored or retrievable, making it an ideal solution for sensitive data.

## Key Features

- **Gradational Redaction**: Unlike traditional redaction tools, TrueSight allows users to define how much information is to be removed, enabling tailored redaction to specific needs.
- **Multi-format Support**: TrueSight supports multiple formats, such as text, images, PDFs, and videos, offering a comprehensive solution for various data types.
- **End-to-End Privacy Assurance**: TrueSight ensures that no input data is stored or retrievable, providing a high level of privacy and security for sensitive data processing.
- **Customizable Output**: Users can select the redaction level and tailor the output to meet their specific needs.

## Proof of Concept (PoC)

The PoC for **TrueSight** supports redaction and anonymization for:
- Text files
- PDF files
- Image files
- Video files

# Model Performance on PII Masking Dataset

| PII Masking Dataset | Precision | Recall | F1 Score | Accuracy |
|---------------------|-----------|--------|----------|----------|
| Custom DBERT        | 0.984     | 0.987  | 0.986    | 0.993    |
| MobileBERT          | 0.941     | 0.952  | 0.946    | 0.992    |
| DistilBERT          | 0.935     | 0.948  | 0.942    | 0.991    |

This table summarizes the performance of different models on a PII masking dataset. The custom DBERT model achieves the highest accuracy and F1 score, indicating its effectiveness in masking personally identifiable information (PII) compared to MobileBERT and DistilBERT.



## Requirements

To run TrueSight, ensure you have the following dependencies installed:

```txt
transformers
torch
streamlit
pandas
numpy
pymupdf
tf-keras
llama-cpp-python
ultralytics
opencv-python
torchvision
```

## Usage
First download models in the streamlit folder
Models - https://drive.google.com/drive/folders/1x5sv_F3odn013JD5-MZQqchJyeVtdNje?usp=sharing 
To launch TrueSight's user interface, run the following command:

```bash
python -m streamlit run app.py
```
