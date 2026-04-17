const { Jimp } = require('jimp');

async function processImage() {
  try {
    const imgSource = "C:\\Users\\maelm\\.gemini\\antigravity\\brain\\f63b79e4-ab45-4a84-8602-e929bacbd665\\media__1776275726304.jpg";
    const imgDest = "d:\\React Native\\AutoGo\\assets\\images\\onboarding_hero.png";
    
    // We try to process the most recent file because that's the one they uploaded with their tool.
    // If it has a checkered background, we can't easily remove it with simple threshold.
    // But let's check its corner color.
    
    const image = await Jimp.read(imgSource);
    
    // Check color at (0,0) - likely background
    const bgPixel = image.getPixelColor(10, 10);
    const bgR = (bgPixel >> 24) & 255;
    const bgG = (bgPixel >> 16) & 255;
    const bgB = (bgPixel >> 8) & 255;
    
    console.log("Background corner color:", bgR, bgG, bgB);
    
    // If it's pure white or close to it, we'll try threshold. 
    // If it's checkered, this will fail miserably. Let's just do a blanket threshold.
    // Actually, if we just multiply the image inside React Native on a white background it would behave similar to web, but RN doesn't.
    // We will do a simple flood-like threshold: everything close to white becomes transparent.
    // Checkered background in remove.bg is usually alternating 0xcccccc and 0xffffff or similar.
    // Let's just try to remove ANY pixel that is > 220 in all RGB channels, just in case it's mostly white.
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      if (r > 230 && g > 230 && b > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 for pure-ish whites
      }
    });

    await image.write(imgDest);
    console.log("SUCCESS. Processed image to " + imgDest);
  } catch (err) {
    console.error("FAILED", err);
  }
}

processImage();
