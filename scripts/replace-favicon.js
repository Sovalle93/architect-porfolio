const fs = require('fs');
const path = require('path');

// Your favicon in public folder
const sourceFavicon = path.join(process.cwd(), 'public', 'favicon.ico');
// Where Next.js puts its default favicon
const targetFavicon = path.join(process.cwd(), '.next', 'static', 'favicon.ico');
const targetFavicon2 = path.join(process.cwd(), '.next', 'server', 'static', 'favicon.ico');
const targetFavicon3 = path.join(process.cwd(), '.next', 'favicon.ico');

try {
  if (fs.existsSync(sourceFavicon)) {
    // Replace all possible locations
    [targetFavicon, targetFavicon2, targetFavicon3].forEach(target => {
      if (fs.existsSync(target)) {
        fs.copyFileSync(sourceFavicon, target);
        console.log(`✅ Replaced: ${target}`);
      } else {
        // Create directory if it doesn't exist
        const dir = path.dirname(target);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.copyFileSync(sourceFavicon, target);
        console.log(`✅ Created: ${target}`);
      }
    });
    console.log('✅ Favicon replacement complete!');
  } else {
    console.error('❌ Source favicon not found at:', sourceFavicon);
    process.exit(1);
  }
} catch (err) {
  console.error('Error replacing favicon:', err);
  process.exit(1);
}