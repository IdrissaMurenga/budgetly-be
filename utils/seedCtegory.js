import Category from "../db/models/categoryModel.js";

export const seedCategories = async () => {
    try {
        for (const category of Categories) {
            await Category.updateOne(
                {
                    name: category.name,
                    type: category.type,
                },
                {
                    $setOnInsert: {
                        icon: category.icon,
                    },
                },
                { upsert: true }
            )
        }
    } catch (error) {
        console.error("❌ Error seeding categories:", error.message)
    }
}

// Each category has a name and a type.
const Categories = [
    { name: 'Food', type: 'expense', icon: 'IoFastFood' },
    { name: 'Transport', type: 'expense', icon: 'FaCarAlt' },
    { name: 'Health', type: 'expense', icon: 'MdHealthAndSafety' },
    { name: 'Salary', type: 'income', icon: 'GiMoneyStack' },
    { name: 'Gift', type: 'expense', icon: 'FaGifts' },
    { name: 'Shopping', type: 'expense', icon: 'FaCartShopping' },
    { name: 'Travel', type: 'expense', icon: 'FaPlaneDeparture' },
    { name: 'Education', type: 'expense', icon: 'TbSchool' },
    { name: 'Savings', type: 'income', icon: 'MdSavings' },
    { name: 'Subscriptions', type: 'expense', icon: 'FaTv' },
    { name: 'Taxes', type: 'expense', icon: 'TbTax' },
    { name: 'Charity', type: 'expense', icon: 'FaHandsHelping' },
    { name: 'Emergency', type: 'expense', icon: 'MdEmergency' },
    { name: 'Business', type: 'income', icon: 'FaBusinessTime' },
    { name: 'Freelance', type: 'income', icon: 'BsPersonWorkspace' },
    { name: 'SideHustle', type: 'income', icon: 'GrUserWorker' },
    { name: 'Rent', type: 'expense', icon: 'FaHome' },
    { name: 'Insurance', type: 'expense', icon: 'FaShieldAlt' },
    { name: 'Entertainment', type: 'expense', icon: 'MdOutlineSportsEsports' },
    { name: 'Groceries', type: 'expense', icon: 'GiShoppingCart' },
    { name: 'Clothing', type: 'expense', icon: 'FaTshirt' },
    { name: 'Investments', type: 'income', icon: 'FaChartLine' },
    { name: 'Rental Income', type: 'income', icon: 'FaBuilding' },
    { name: 'Dividends', type: 'income', icon: 'FaCoins' },
    { name: 'Interest', type: 'income', icon: 'FaPercentage' },
    { name: 'Bonus', type: 'income', icon: 'FaGift' },
    { name: 'Refunds', type: 'income', icon: 'FaUndo' },
]