#!/bin/bash

echo "🍽️ Deploying Mayel Restaurant to Project: prj_pAKcLEkBIiknTtp9ky5uENZasU8q"
echo "=================================================================="
echo ""

# Set environment variables
export VERCEL_ORG_ID=team_7bDhvBs1khWp7EL45dxRtYxe
export VERCEL_PROJECT_ID=prj_pAKcLEkBIiknTtp9ky5uENZasU8q

echo "✅ Menu Updates Ready:"
echo "  • Tuna Pasta Salad ($9)"
echo "  • Mayel Salad ($9)"
echo "  • Updated all salad prices"
echo ""

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
npx vercel whoami 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Please login to Vercel first:"
    echo "   npx vercel login"
    echo ""
    echo "Then run this script again!"
    exit 1
fi

echo "✅ Authentication confirmed!"
echo "🚀 Deploying to production..."
echo ""

npx vercel --prod --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your updated menu is now live!"
    echo "🌐 Website: https://mayelrestaurant.vercel.app"
    echo ""
    echo "📋 Check your website - new salad items should be visible!"
else
    echo "❌ Deployment failed. Please check the error above."
fi