# Mayel Restaurant - Menu Update Guide 🍔

## Current Menu Updates Applied ✅

### Salads Section
- **Crab Salad**: $7.00 (updated from $7.50)
- **Tuna Pasta Salad**: $9.00 
  - *Ingredients: Tuna, Cherry Tomato, Pasta, Corn, Olive, Cornichon, Lemon Mayo Sauce*
- **Mayel Salad**: $9.00
  - *Ingredients: Grilled Chicken, Pasta, Rocca, Iceberg, Cherry Tomato, Cheddar, Mayel Honey Mustard Sauce*

### Sandwiches Section  
- **Z Honey Chick**: $7.00 (NEW ITEM)
  - *Ingredients: Grilled Chicken, Rocca, Tomato, Pickles, Honey Mustard Sauce*

---

## How to Update Menu in the Future

### 1. Edit Menu File
```bash
# Open the menu file
open lib/menuData.ts
```

### 2. Make Changes
- Find the item you want to update
- Change the `price` field
- Update the `desc` field for ingredients
- Add new items by copying existing format

### 3. Deploy Changes
```bash
# Save and deploy
git add .
git commit -m "Update menu - describe your changes"
git push origin main
```

### 4. Check Live Site
- Wait 2-3 minutes for Vercel to build
- Check: https://mayelrestaurant.vercel.app

---

## Technical Setup ⚙️

- **Repository**: https://github.com/nulado112-sys/browse.git
- **Deployment**: https://mayelrestaurant.vercel.app  
- **Auto-deploy**: Enabled (pushes to GitHub trigger Vercel deployment)
- **Menu File**: `lib/menuData.ts`

---

## Domain Notes 🌐

- **Vercel URL**: https://mayelrestaurant.vercel.app (auto-updated)
- **Custom Domain**: https://www.mayellb.com (needs domain connection setup)

To connect mayellb.com to show updated menu:
1. Go to Vercel project settings
2. Add custom domain: mayellb.com
3. Update DNS settings as instructed

---

*Last updated: Menu items with detailed ingredients and correct prices*
*Next steps: Connect custom domain if needed*