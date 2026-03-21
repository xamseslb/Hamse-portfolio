import fitz
import os

pdf_path = "SHSH_The_Private_Conversation_App (1).pdf"
out_dir = "../next-app/public/images/shush/"

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

doc = fitz.open(pdf_path)

print("--- EXTRACTING TEXT ---")
full_text = []
for page_num in range(len(doc)):
    page = doc.load_page(page_num)
    full_text.append(f"--- PAGE {page_num + 1} ---")
    full_text.append(page.get_text())
    
    # Extract images
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_name = f"page{page_num+1}_img{img_index+1}.{image_ext}"
        image_path = os.path.join(out_dir, image_name)
        
        with open(image_path, "wb") as f:
            f.write(image_bytes)

print("\n".join(full_text))
print("--- DONE EXTRACTING TEXT AND IMAGES ---")
