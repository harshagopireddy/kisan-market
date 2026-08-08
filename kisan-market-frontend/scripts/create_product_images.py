from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

folder = Path(r"c:\Users\hgopi\OneDrive\Desktop\Projects MAIN\kisan-market-frontend\src\assets\Product Images")
folder.mkdir(parents=True, exist_ok=True)

files = [
    ("banana", (34, 139, 34)),
    ("coconut", (0, 102, 204)),
    ("mirchi", (204, 0, 0)),
    ("mango", (255, 140, 0)),
]

for name, color in files:
    img = Image.new("RGB", (800, 800), (248, 248, 248))
    draw = ImageDraw.Draw(img)
    draw.rectangle((30, 30, 770, 770), outline=color, width=12)
    try:
        font = ImageFont.truetype("arial.ttf", 64)
    except Exception:
        font = ImageFont.load_default()
    text = name.capitalize()
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (800 - w) // 2
    y = (800 - h) // 2
    draw.text((x, y), text, fill=color, font=font)
    img.save(folder / f"{name}.jpg", quality=95)

print("Created:")
for name, _ in files:
    print(f"- {name}.jpg")
