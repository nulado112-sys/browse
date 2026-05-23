#!/bin/bash

echo "🚀 Deploying Mayel Restaurant Website with Updated Menu..."
echo ""
echo "✅ Menu Updates Applied:"
echo "  - Added: Tuna Pasta Salad ($9)"
echo "  - Added: Mayel Salad ($9)"
echo "  - Updated: Chicken Caesar ($7.5)"
echo "  - Updated: Crab Salad ($7.5)"
echo "  - Updated: Feta Salad ($8)"
echo "  - Updated: Nacho Salad ($8.5)"
echo ""

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    npx vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "📱 Your website is live at: https://mayelrestaurant.vercel.app"
        echo ""
        echo "Menu changes are now live! 🍽️"
    else
        echo "❌ Deployment failed. Please run 'vercel login' first."
        echo "💡 Alternative: Upload manually to Vercel dashboard"
    fi
else
    echo "❌ Build failed. Please check for errors."
fi