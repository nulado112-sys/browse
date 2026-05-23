#!/bin/bash

echo "🍽️ Deploying Mayel Restaurant - Updated Menu"
echo "================================================"
echo ""
echo "✅ Changes Ready:"
echo "  • Added: Tuna Pasta Salad ($9)"
echo "  • Added: Mayel Salad ($9)"
echo "  • Updated all salad prices"
echo ""

# Check if logged in
echo "🔐 Checking Vercel login..."
npx vercel whoami 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Vercel"
    echo "🔑 Please login first:"
    echo "   npx vercel login"
    echo ""
    echo "Then run this script again: ./quick-deploy.sh"
    exit 1
fi

echo "✅ Vercel login confirmed!"
echo ""
echo "🚀 Deploying to production..."

npx vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your menu is now live!"
    echo "🌐 Website: https://mayelrestaurant.vercel.app"
    echo ""
    echo "📋 New menu items are now visible!"
else
    echo "❌ Deployment failed. Please check the error above."
fi