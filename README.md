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

## Requirements

To run TrueSight, ensure you have the following installed:

- Python 3.x
- Streamlit
- Necessary Python packages (listed in `requirements.txt`)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/YourUsername/TrueSight.git
    cd TrueSight
    ```

2. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

To launch TrueSight's user interface, run the following command:

```bash
python -m streamlit run app.py
