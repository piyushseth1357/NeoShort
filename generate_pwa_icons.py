from PIL import Image, ImageDraw, ImageFont
import os

source_logo = r"C:\Users\asus\.gemini\antigravity\brain\b1de9d4d-ac69-4eb4-bc86-884fbab9c2d3\neoshort_logo_1790539725241.jpg"
public_dir = r"C:\Users\asus\OneDrive\Desktop\NeoShort\frontend\public"

# Load base logo
img = Image.open(source_logo).convert("RGBA")

# 1. Generate 192x192 PNG
icon_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
icon_192.save(os.path.join(public_dir, "icon-192.png"), "PNG")
print("Generated icon-192.png (192x192)")

# 2. Generate 512x512 PNG
icon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
icon_512.save(os.path.join(public_dir, "icon-512.png"), "PNG")
icon_512.save(os.path.join(public_dir, "logo.png"), "PNG") # True PNG logo
print("Generated icon-512.png and logo.png (512x512)")

# 3. Generate 512x512 Maskable Icon (with 15% safe zone padding)
maskable = Image.new("RGBA", (512, 512), (8, 8, 12, 255))
scaled_logo = img.resize((410, 410), Image.Resampling.LANCZOS)
maskable.paste(scaled_logo, (51, 51), scaled_logo)
maskable.save(os.path.join(public_dir, "icon-maskable.png"), "PNG")
print("Generated icon-maskable.png (512x512)")

# 4. Generate Wide Screenshot (1280x720) for Desktop Showcase
wide_ss = Image.new("RGB", (1280, 720), (12, 12, 18))
draw_wide = ImageDraw.Draw(wide_ss)
draw_wide.rectangle([40, 40, 1240, 680], outline=(255, 45, 85, 100), width=2)
# Paste logo in center
center_logo = img.resize((220, 220), Image.Resampling.LANCZOS)
wide_ss.paste(center_logo, (530, 200), center_logo)
wide_ss.save(os.path.join(public_dir, "screenshot-wide.png"), "PNG")
print("Generated screenshot-wide.png (1280x720)")

# 5. Generate Mobile Screenshot (720x1280) for Mobile Showcase
mobile_ss = Image.new("RGB", (720, 1280), (8, 8, 12))
draw_mobile = ImageDraw.Draw(mobile_ss)
draw_mobile.rectangle([30, 30, 690, 1250], outline=(255, 45, 85, 100), width=2)
mobile_logo = img.resize((240, 240), Image.Resampling.LANCZOS)
mobile_ss.paste(mobile_logo, (240, 450), mobile_logo)
mobile_ss.save(os.path.join(public_dir, "screenshot-mobile.png"), "PNG")
print("Generated screenshot-mobile.png (720x1280)")

print("All PWABuilder assets created successfully!")
