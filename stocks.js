// Stock Trading Game - GTA Style
class StockTradingGame {
    constructor() {
        // Game state
        this.cash = 5000;
        this.holdings = {}; // { symbol: { name, shares, purchasePrice } }
        this.day = 1;
        this.daysPassed = 0;
        this.transactions = [];
        this.loan = 0;
        this.loanInterestRate = 0.15; // 15% interest per day
        this.totalDividends = 0;
        this.currentEvent = null;
        this.eventCounter = 0;
        this.totalEarnings = 0;

        // Stock data - 200 companies
        this.stocks = {
            // Media & Entertainment
            WEAZL: { name: 'Weazel News Media', basePrice: 45, volatility: 0.08, sector: 'Media', dividend: 0.05 },
            LAZLOW: { name: 'Lazlow Industries', basePrice: 48, volatility: 0.08, sector: 'Entertainment', dividend: 0.03 },
            VINEWOOD: { name: 'Vinewood Pictures', basePrice: 40, volatility: 0.1, sector: 'Entertainment', dividend: 0.02 },
            EYEFIND: { name: 'Eyefind Search Engine', basePrice: 38, volatility: 0.11, sector: 'Media', dividend: 0.01 },
            ROCKSTARGAMES: { name: 'Rockstar Games', basePrice: 65, volatility: 0.13, sector: 'Entertainment', dividend: 0.02 },
            HEARTSRADIO: { name: 'Hearts Radio Broadcasting', basePrice: 32, volatility: 0.07, sector: 'Media', dividend: 0.04 },
            GTAVTV: { name: 'GTAV Television Network', basePrice: 52, volatility: 0.09, sector: 'Media', dividend: 0.03 },
            PODIUM: { name: 'Podium Magazine', basePrice: 24, volatility: 0.08, sector: 'Media', dividend: 0.02 },
            // Construction & Real Estate
            GOLD: { name: 'Gold Coast Construction', basePrice: 32, volatility: 0.06, sector: 'Construction', dividend: 0.03 },
            CONSTRUCTCO: { name: 'ConstructCo Builder', basePrice: 35, volatility: 0.07, sector: 'Construction', dividend: 0.03 },
            SAFEHOUSE: { name: 'SafeHouse Properties', basePrice: 48, volatility: 0.06, sector: 'Real Estate', dividend: 0.04 },
            LUXEREAL: { name: 'Luxe Real Estate', basePrice: 58, volatility: 0.08, sector: 'Real Estate', dividend: 0.03 },
            BUILDIT: { name: 'Build It Construction', basePrice: 28, volatility: 0.07, sector: 'Construction', dividend: 0.02 },
            ESTATE: { name: 'Estate Property Group', basePrice: 45, volatility: 0.07, sector: 'Real Estate', dividend: 0.04 },
            CONCRETE: { name: 'Concrete Solutions Inc', basePrice: 31, volatility: 0.06, sector: 'Construction', dividend: 0.03 },
            // Finance & Banking
            BAWSAQ: { name: 'Bawsaq Finance', basePrice: 55, volatility: 0.09, sector: 'Finance', dividend: 0.06 },
            MAZE: { name: 'Maze Bank Finance', basePrice: 60, volatility: 0.11, sector: 'Banking', dividend: 0.07 },
            FLEECA: { name: 'Fleeca Bank Corp', basePrice: 52, volatility: 0.1, sector: 'Banking', dividend: 0.06 },
            GOLDCOIN: { name: 'GoldCoin Banking', basePrice: 48, volatility: 0.09, sector: 'Finance', dividend: 0.05 },
            SECURIBANK: { name: 'SecuriBank Finance', basePrice: 56, volatility: 0.08, sector: 'Banking', dividend: 0.06 },
            INVESTCORP: { name: 'InvestCorp Financial', basePrice: 62, volatility: 0.1, sector: 'Finance', dividend: 0.05 },
            CREDITMAX: { name: 'CreditMax Services', basePrice: 41, volatility: 0.09, sector: 'Finance', dividend: 0.04 },
            LENDTECH: { name: 'LendTech Solutions', basePrice: 44, volatility: 0.11, sector: 'Finance', dividend: 0.03 },
            // Food & Beverage
            CLUCKIN: { name: 'Cluckin Bell Food', basePrice: 38, volatility: 0.05, sector: 'Food & Beverage', dividend: 0.04 },
            BURGERSHOT: { name: 'Burger Shot Restaurants', basePrice: 36, volatility: 0.06, sector: 'Food & Beverage', dividend: 0.04 },
            PIZZERIA: { name: 'Vittoria Pizza Co', basePrice: 29, volatility: 0.05, sector: 'Food & Beverage', dividend: 0.03 },
            SEAFOOD: { name: 'Captain Seafood Market', basePrice: 33, volatility: 0.07, sector: 'Food & Beverage', dividend: 0.03 },
            DINER: { name: 'Taco Diner Restaurants', basePrice: 27, volatility: 0.06, sector: 'Food & Beverage', dividend: 0.03 },
            COFFEE: { name: 'Brew Coffee Shops', basePrice: 24, volatility: 0.05, sector: 'Food & Beverage', dividend: 0.02 },
            FOODMART: { name: 'FoodMart Groceries', basePrice: 42, volatility: 0.05, sector: 'Food & Beverage', dividend: 0.04 },
            BAKERY: { name: 'Artisan Bakery Corp', basePrice: 21, volatility: 0.04, sector: 'Food & Beverage', dividend: 0.02 },
            BREWERY: { name: 'Brewery Craft Beer', basePrice: 35, volatility: 0.08, sector: 'Food & Beverage', dividend: 0.03 },
            // Technology
            LIFEINVADER: { name: 'LifeInvader Social', basePrice: 50, volatility: 0.12, sector: 'Tech', dividend: 0.01 },
            TECHSTORE: { name: 'TechStore Electronics', basePrice: 35, volatility: 0.13, sector: 'Tech', dividend: 0.02 },
            CYBER: { name: 'CyberTech Solutions', basePrice: 47, volatility: 0.14, sector: 'Tech', dividend: 0.01 },
            SOFTTECH: { name: 'SoftTech Software', basePrice: 53, volatility: 0.11, sector: 'Tech', dividend: 0.02 },
            NETCODE: { name: 'NetCode Systems', basePrice: 44, volatility: 0.12, sector: 'Tech', dividend: 0.01 },
            DIGITAL: { name: 'Digital Innovations', basePrice: 48, volatility: 0.13, sector: 'Tech', dividend: 0.01 },
            WEBHOST: { name: 'WebHost Services', basePrice: 39, volatility: 0.11, sector: 'Tech', dividend: 0.02 },
            MOBILE: { name: 'MobileTech Corporation', basePrice: 55, volatility: 0.14, sector: 'Tech', dividend: 0.01 },
            // Agriculture
            CORN: { name: 'Corn Produce & Farm', basePrice: 28, volatility: 0.07, sector: 'Agriculture', dividend: 0.04 },
            HARVEST: { name: 'Harvest Grains Inc', basePrice: 26, volatility: 0.08, sector: 'Agriculture', dividend: 0.03 },
            ORGANIC: { name: 'Organic Farms Co', basePrice: 31, volatility: 0.06, sector: 'Agriculture', dividend: 0.04 },
            AGRICULTURAL: { name: 'Agricultural Solutions', basePrice: 34, volatility: 0.07, sector: 'Agriculture', dividend: 0.03 },
            CROPS: { name: 'Crops & Seeds Ltd', basePrice: 22, volatility: 0.08, sector: 'Agriculture', dividend: 0.03 },
            LIVESTOCK: { name: 'Livestock Farming Co', basePrice: 25, volatility: 0.07, sector: 'Agriculture', dividend: 0.04 },
            RANCHING: { name: 'Ranching Industries', basePrice: 29, volatility: 0.08, sector: 'Agriculture', dividend: 0.03 },
            GREENHOUSE: { name: 'GreenHouse Agriculture', basePrice: 24, volatility: 0.06, sector: 'Agriculture', dividend: 0.04 },
            // Healthcare
            PHARMA: { name: 'Pillbox Pharma', basePrice: 52, volatility: 0.09, sector: 'Healthcare', dividend: 0.05 },
            MEDCARE: { name: 'MedCare Hospital Group', basePrice: 48, volatility: 0.08, sector: 'Healthcare', dividend: 0.04 },
            BIOTECH: { name: 'BioTech Research', basePrice: 54, volatility: 0.11, sector: 'Healthcare', dividend: 0.03 },
            WELLNESS: { name: 'Wellness Health Corp', basePrice: 41, volatility: 0.07, sector: 'Healthcare', dividend: 0.04 },
            CLINIC: { name: 'ProClinic Medical', basePrice: 39, volatility: 0.08, sector: 'Healthcare', dividend: 0.04 },
            PHARMACY: { name: 'PharmaCare Retail', basePrice: 36, volatility: 0.07, sector: 'Healthcare', dividend: 0.03 },
            LABS: { name: 'Labs & Testing Services', basePrice: 43, volatility: 0.09, sector: 'Healthcare', dividend: 0.04 },
            DENTAL: { name: 'SmileDental Centers', basePrice: 32, volatility: 0.06, sector: 'Healthcare', dividend: 0.03 },
            // Retail & Shopping
            AMMU: { name: 'Ammu-Nation Weapons', basePrice: 42, volatility: 0.1, sector: 'Retail', dividend: 0.02 },
            CLOTHING: { name: 'Style Clothing Stores', basePrice: 37, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            MALL: { name: 'Grand Mall Shopping', basePrice: 45, volatility: 0.06, sector: 'Retail', dividend: 0.03 },
            SHOE: { name: 'Shoe Express', basePrice: 31, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            DEPARTMENT: { name: 'Department Store Plus', basePrice: 43, volatility: 0.07, sector: 'Retail', dividend: 0.03 },
            FASHION: { name: 'Fashion District Retail', basePrice: 46, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            SPORTS: { name: 'Sports Authority', basePrice: 38, volatility: 0.09, sector: 'Retail', dividend: 0.02 },
            TOYS: { name: 'Toy Kingdom Stores', basePrice: 33, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            // Automotive
            MAZDAK: { name: 'MazdaK Motors', basePrice: 51, volatility: 0.1, sector: 'Automotive', dividend: 0.03 },
            DECAY: { name: 'Decay Motors Corp', basePrice: 48, volatility: 0.1, sector: 'Automotive', dividend: 0.03 },
            SPEEDIFY: { name: 'Speedify Auto Parts', basePrice: 36, volatility: 0.09, sector: 'Automotive', dividend: 0.02 },
            MECHANIC: { name: 'Premier Mechanics', basePrice: 34, volatility: 0.08, sector: 'Automotive', dividend: 0.02 },
            RENTAL: { name: 'Rent-A-Car Services', basePrice: 41, volatility: 0.08, sector: 'Automotive', dividend: 0.03 },
            GARAGE: { name: 'Premium Garage', basePrice: 39, volatility: 0.07, sector: 'Automotive', dividend: 0.02 },
            DEALERSHIP: { name: 'Luxury Car Dealership', basePrice: 56, volatility: 0.1, sector: 'Automotive', dividend: 0.02 },
            FUEL: { name: 'FuelTech Gas Stations', basePrice: 44, volatility: 0.08, sector: 'Automotive', dividend: 0.04 },
            // Transportation & Logistics
            AIRLINES: { name: 'Sky Airlines Corp', basePrice: 49, volatility: 0.11, sector: 'Transportation', dividend: 0.02 },
            SHIPPING: { name: 'Global Shipping Co', basePrice: 42, volatility: 0.09, sector: 'Transportation', dividend: 0.03 },
            DELIVERY: { name: 'Express Delivery Inc', basePrice: 38, volatility: 0.1, sector: 'Transportation', dividend: 0.02 },
            TRANSPORT: { name: 'Transport Solutions', basePrice: 35, volatility: 0.08, sector: 'Transportation', dividend: 0.03 },
            TRANSIT: { name: 'Public Transit Corp', basePrice: 32, volatility: 0.07, sector: 'Transportation', dividend: 0.04 },
            TAXI: { name: 'TaxiCab Services', basePrice: 29, volatility: 0.08, sector: 'Transportation', dividend: 0.02 },
            LOGISTICS: { name: 'Logistics Network Ltd', basePrice: 46, volatility: 0.09, sector: 'Transportation', dividend: 0.03 },
            // Hotels & Tourism
            HOTEL: { name: 'Hotel Grand Chain', basePrice: 52, volatility: 0.08, sector: 'Tourism', dividend: 0.03 },
            RESORT: { name: 'Resort Paradise Corp', basePrice: 55, volatility: 0.09, sector: 'Tourism', dividend: 0.03 },
            TOURISM: { name: 'Tourism Board Inc', basePrice: 39, volatility: 0.07, sector: 'Tourism', dividend: 0.02 },
            LODGE: { name: 'Lodge & Spa Group', basePrice: 44, volatility: 0.08, sector: 'Tourism', dividend: 0.02 },
            CASINO: { name: 'Lucky Casino Resorts', basePrice: 58, volatility: 0.12, sector: 'Tourism', dividend: 0.02 },
            BEACH: { name: 'Beach Club Resorts', basePrice: 47, volatility: 0.08, sector: 'Tourism', dividend: 0.03 },
            // Energy & Utilities
            POWER: { name: 'PowerGrid Energy', basePrice: 48, volatility: 0.07, sector: 'Energy', dividend: 0.05 },
            SOLAR: { name: 'SolarTech Renewable', basePrice: 52, volatility: 0.1, sector: 'Energy', dividend: 0.03 },
            ELECTRIC: { name: 'Electric Utilities Co', basePrice: 44, volatility: 0.06, sector: 'Energy', dividend: 0.06 },
            OIL: { name: 'Diesel Oil Corp', basePrice: 51, volatility: 0.11, sector: 'Energy', dividend: 0.04 },
            GAS: { name: 'Natural Gas Inc', basePrice: 46, volatility: 0.09, sector: 'Energy', dividend: 0.05 },
            WATER: { name: 'Water Systems Ltd', basePrice: 35, volatility: 0.05, sector: 'Energy', dividend: 0.06 },
            // Education
            SCHOOL: { name: 'Education Plus Corp', basePrice: 34, volatility: 0.06, sector: 'Education', dividend: 0.02 },
            UNIVERSITY: { name: 'University Group Inc', basePrice: 42, volatility: 0.07, sector: 'Education', dividend: 0.02 },
            TRAINING: { name: 'TrainingHub Academy', basePrice: 31, volatility: 0.08, sector: 'Education', dividend: 0.02 },
            ONLINE: { name: 'OnlineEdu Learning', basePrice: 40, volatility: 0.09, sector: 'Education', dividend: 0.01 },
            // Sports & Recreation
            SPORTS: { name: 'Sports Complex Inc', basePrice: 43, volatility: 0.08, sector: 'Sports', dividend: 0.02 },
            STADIUM: { name: 'Stadium Entertainment', basePrice: 51, volatility: 0.09, sector: 'Sports', dividend: 0.02 },
            GYM: { name: 'Fitness Gym Chain', basePrice: 36, volatility: 0.07, sector: 'Sports', dividend: 0.02 },
            RECREATION: { name: 'Recreation & Leisure', basePrice: 38, volatility: 0.08, sector: 'Sports', dividend: 0.02 },
            // Fashion & Beauty
            BEAUTY: { name: 'Beauty & Cosmetics Co', basePrice: 41, volatility: 0.08, sector: 'Fashion', dividend: 0.02 },
            SALON: { name: 'Premium Salon Group', basePrice: 35, volatility: 0.07, sector: 'Fashion', dividend: 0.02 },
            PERFUME: { name: 'Perfume Luxury Brand', basePrice: 48, volatility: 0.09, sector: 'Fashion', dividend: 0.02 },
            JEWELRY: { name: 'Jewelry & Gems Ltd', basePrice: 62, volatility: 0.1, sector: 'Fashion', dividend: 0.02 },
            WATCH: { name: 'Luxury Watch Co', basePrice: 58, volatility: 0.09, sector: 'Fashion', dividend: 0.02 },
            // Insurance & Security
            INSURANCE: { name: 'Insurance Group Corp', basePrice: 45, volatility: 0.07, sector: 'Insurance', dividend: 0.05 },
            SECURITY: { name: 'Security Services Ltd', basePrice: 39, volatility: 0.08, sector: 'Insurance', dividend: 0.03 },
            PROTECTION: { name: 'Protection Plus Inc', basePrice: 42, volatility: 0.08, sector: 'Insurance', dividend: 0.04 },
            // Manufacturing
            FACTORY: { name: 'Factory Manufacturing', basePrice: 36, volatility: 0.08, sector: 'Manufacturing', dividend: 0.02 },
            INDUSTRIAL: { name: 'Industrial Solutions', basePrice: 43, volatility: 0.09, sector: 'Manufacturing', dividend: 0.02 },
            METALWORKS: { name: 'MetalWorks Inc', basePrice: 38, volatility: 0.08, sector: 'Manufacturing', dividend: 0.02 },
            // Telecommunications
            TELECOM: { name: 'TeleCom Network', basePrice: 51, volatility: 0.09, sector: 'Telecom', dividend: 0.04 },
            SIGNAL: { name: 'Signal Mobile Corp', basePrice: 47, volatility: 0.1, sector: 'Telecom', dividend: 0.03 },
            INTERNET: { name: 'InternetXpress', basePrice: 44, volatility: 0.11, sector: 'Telecom', dividend: 0.02 },
            // Entertainment & Bars
            CLUB: { name: 'Club & Lounge Corp', basePrice: 44, volatility: 0.09, sector: 'Entertainment', dividend: 0.02 },
            BAR: { name: 'Bar & Nightlife Inc', basePrice: 40, volatility: 0.1, sector: 'Entertainment', dividend: 0.02 },
            ARCADE: { name: 'Arcade Gaming Centers', basePrice: 32, volatility: 0.08, sector: 'Entertainment', dividend: 0.01 },
            // General Retail & Markets
            MARKET: { name: 'Public Market Corp', basePrice: 33, volatility: 0.06, sector: 'Retail', dividend: 0.03 },
            GENERAL: { name: 'General Store Inc', basePrice: 28, volatility: 0.05, sector: 'Retail', dividend: 0.03 },
            CONVENIENCE: { name: '24/7 Convenience Store', basePrice: 26, volatility: 0.05, sector: 'Retail', dividend: 0.02 },
            // Additional Diverse Stocks
            METAL: { name: 'Metal Alloys Corp', basePrice: 47, volatility: 0.09, sector: 'Manufacturing', dividend: 0.02 },
            TEXTILE: { name: 'Textile Mills Inc', basePrice: 32, volatility: 0.07, sector: 'Manufacturing', dividend: 0.02 },
            PAPER: { name: 'Paper Products Co', basePrice: 29, volatility: 0.06, sector: 'Manufacturing', dividend: 0.03 },
            CHEMICAL: { name: 'Chemical Industries', basePrice: 44, volatility: 0.1, sector: 'Manufacturing', dividend: 0.02 },
            PAINT: { name: 'Premium Paint Co', basePrice: 35, volatility: 0.08, sector: 'Manufacturing', dividend: 0.02 },
            GLASS: { name: 'Glass & Mirrors Ltd', basePrice: 34, volatility: 0.07, sector: 'Manufacturing', dividend: 0.02 },
            PLASTIC: { name: 'Plastic Solutions Inc', basePrice: 31, volatility: 0.08, sector: 'Manufacturing', dividend: 0.02 },
            PACKAGING: { name: 'Packaging Materials', basePrice: 33, volatility: 0.07, sector: 'Manufacturing', dividend: 0.02 },
            FURNITURE: { name: 'Furniture & Decor', basePrice: 41, volatility: 0.08, sector: 'Manufacturing', dividend: 0.02 },
            APPLIANCE: { name: 'Home Appliances Corp', basePrice: 45, volatility: 0.08, sector: 'Manufacturing', dividend: 0.02 },
            HARDWARE: { name: 'Hardware Supplies', basePrice: 38, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            TOOLS: { name: 'Tools & Equipment', basePrice: 36, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            GARDEN: { name: 'Garden & Outdoor', basePrice: 34, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            PETSTORE: { name: 'Pet Store Chain', basePrice: 35, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            BOOKSTORE: { name: 'Bookstore & Media', basePrice: 32, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            MUSIC: { name: 'Music & Records Co', basePrice: 37, volatility: 0.09, sector: 'Entertainment', dividend: 0.01 },
            GAMING: { name: 'Gaming Console Corp', basePrice: 52, volatility: 0.12, sector: 'Entertainment', dividend: 0.01 },
            SPORT: { name: 'Sports Equipment Inc', basePrice: 39, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            OUTDOOR: { name: 'Outdoor Adventure Co', basePrice: 42, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            // More Additional Stocks
            BREWERY2: { name: 'Craft Brewery Union', basePrice: 38, volatility: 0.09, sector: 'Food & Beverage', dividend: 0.03 },
            WINERY: { name: 'Premium Winery Corp', basePrice: 45, volatility: 0.08, sector: 'Food & Beverage', dividend: 0.02 },
            DISTILLERY: { name: 'Distillery Spirits Inc', basePrice: 47, volatility: 0.09, sector: 'Food & Beverage', dividend: 0.02 },
            CANDY: { name: 'Candy Factory Co', basePrice: 28, volatility: 0.07, sector: 'Food & Beverage', dividend: 0.02 },
            SNACKS: { name: 'Snack Foods Inc', basePrice: 32, volatility: 0.06, sector: 'Food & Beverage', dividend: 0.03 },
            DAIRY: { name: 'Dairy Products Ltd', basePrice: 35, volatility: 0.06, sector: 'Food & Beverage', dividend: 0.03 },
            MEAT: { name: 'Meat Processing Co', basePrice: 36, volatility: 0.07, sector: 'Food & Beverage', dividend: 0.02 },
            FISH: { name: 'Fishing Industries', basePrice: 33, volatility: 0.08, sector: 'Food & Beverage', dividend: 0.02 },
            JUICE: { name: 'Juice & Beverages', basePrice: 30, volatility: 0.07, sector: 'Food & Beverage', dividend: 0.02 },
            FROZEN: { name: 'Frozen Foods Co', basePrice: 29, volatility: 0.06, sector: 'Food & Beverage', dividend: 0.03 },
            SPICE: { name: 'Spice & Seasonings', basePrice: 25, volatility: 0.06, sector: 'Food & Beverage', dividend: 0.02 },
            SUGAR: { name: 'Sugar & Sweeteners', basePrice: 27, volatility: 0.08, sector: 'Food & Beverage', dividend: 0.02 },
            OILS: { name: 'Cooking Oils Corp', basePrice: 31, volatility: 0.07, sector: 'Food & Beverage', dividend: 0.03 },
            VITAMIN: { name: 'Vitamin & Supplements', basePrice: 44, volatility: 0.08, sector: 'Healthcare', dividend: 0.03 },
            SURGERY: { name: 'Surgical Instruments', basePrice: 49, volatility: 0.08, sector: 'Healthcare', dividend: 0.03 },
            HOSPITAL: { name: 'Hospital Systems', basePrice: 53, volatility: 0.08, sector: 'Healthcare', dividend: 0.04 },
            NURSING: { name: 'Nursing Care Corp', basePrice: 37, volatility: 0.07, sector: 'Healthcare', dividend: 0.04 },
            THERAPY: { name: 'Physical Therapy Inc', basePrice: 35, volatility: 0.07, sector: 'Healthcare', dividend: 0.03 },
            MEDICAL: { name: 'Medical Equipment', basePrice: 50, volatility: 0.08, sector: 'Healthcare', dividend: 0.03 },
            VACCINE: { name: 'Vaccine Research Co', basePrice: 58, volatility: 0.1, sector: 'Healthcare', dividend: 0.02 },
            OPTICS: { name: 'Optics & Eyewear', basePrice: 38, volatility: 0.07, sector: 'Healthcare', dividend: 0.02 },
            AUDIO: { name: 'Audio Equipment Inc', basePrice: 43, volatility: 0.09, sector: 'Tech', dividend: 0.02 },
            CAMERA: { name: 'Camera Technology Co', basePrice: 46, volatility: 0.09, sector: 'Tech', dividend: 0.02 },
            PRINTER: { name: 'Printer & Scanners', basePrice: 37, volatility: 0.08, sector: 'Tech', dividend: 0.02 },
            SERVER: { name: 'Server Systems Corp', basePrice: 51, volatility: 0.11, sector: 'Tech', dividend: 0.02 },
            DATABASE: { name: 'Database Solutions', basePrice: 49, volatility: 0.1, sector: 'Tech', dividend: 0.02 },
            SECURITY_SOFT: { name: 'Security Software Inc', basePrice: 52, volatility: 0.11, sector: 'Tech', dividend: 0.01 },
            CLOUD: { name: 'Cloud Services Corp', basePrice: 54, volatility: 0.12, sector: 'Tech', dividend: 0.01 },
            AI: { name: 'AI Technologies', basePrice: 59, volatility: 0.14, sector: 'Tech', dividend: 0.01 },
            ROBOT: { name: 'Robotics & Automation', basePrice: 56, volatility: 0.12, sector: 'Tech', dividend: 0.01 },
            DRONE: { name: 'Drone Technology', basePrice: 48, volatility: 0.13, sector: 'Tech', dividend: 0.01 },
            BATTERY: { name: 'Battery Technology', basePrice: 42, volatility: 0.1, sector: 'Tech', dividend: 0.02 },
            SOLAR_PANEL: { name: 'Solar Panel Mfg', basePrice: 47, volatility: 0.1, sector: 'Energy', dividend: 0.02 },
            WIND: { name: 'Wind Energy Corp', basePrice: 45, volatility: 0.1, sector: 'Energy', dividend: 0.02 },
            HYDRO: { name: 'Hydroelectric Power', basePrice: 43, volatility: 0.08, sector: 'Energy', dividend: 0.04 },
            GEOTHERMAL: { name: 'Geothermal Energy', basePrice: 41, volatility: 0.09, sector: 'Energy', dividend: 0.03 },
            COAL: { name: 'Coal Mining Corp', basePrice: 39, volatility: 0.09, sector: 'Energy', dividend: 0.03 },
            MINING: { name: 'Mining Operations', basePrice: 44, volatility: 0.1, sector: 'Energy', dividend: 0.02 },
            FACTORY2: { name: 'Factory Outlet', basePrice: 31, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            OUTLET: { name: 'Outlet Centers', basePrice: 33, volatility: 0.06, sector: 'Retail', dividend: 0.02 },
            DISCOUNT: { name: 'Discount Store Chain', basePrice: 27, volatility: 0.06, sector: 'Retail', dividend: 0.02 },
            SECONDHAND: { name: 'Secondhand Goods', basePrice: 24, volatility: 0.08, sector: 'Retail', dividend: 0.01 },
            AUCTION: { name: 'Auction House Corp', basePrice: 35, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            PAWN: { name: 'Pawn Shop Network', basePrice: 29, volatility: 0.09, sector: 'Retail', dividend: 0.01 },
            ANTIQUE: { name: 'Antique & Collectibles', basePrice: 42, volatility: 0.08, sector: 'Retail', dividend: 0.02 },
            BAKERY2: { name: 'Donut Shop Chain', basePrice: 26, volatility: 0.06, sector: 'Food & Beverage', dividend: 0.02 },
            LAUNDRY: { name: 'Laundromat Services', basePrice: 23, volatility: 0.05, sector: 'Retail', dividend: 0.02 },
            CLEANING: { name: 'Cleaning Services Inc', basePrice: 32, volatility: 0.06, sector: 'Retail', dividend: 0.02 },
            DRY_CLEAN: { name: 'Dry Cleaning Corp', basePrice: 29, volatility: 0.06, sector: 'Retail', dividend: 0.02 },
            TAILOR: { name: 'Tailor & Alterations', basePrice: 27, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            REPAIR: { name: 'Repair Services Ltd', basePrice: 31, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            PLUMING: { name: 'Plumbing Supplies', basePrice: 36, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            ELECTRIC_SUPPLY: { name: 'Electrical Supplies', basePrice: 38, volatility: 0.07, sector: 'Retail', dividend: 0.02 },
            HVAC: { name: 'HVAC Systems Corp', basePrice: 41, volatility: 0.08, sector: 'Manufacturing', dividend: 0.02 },
            ROOFING: { name: 'Roofing Materials Inc', basePrice: 34, volatility: 0.07, sector: 'Construction', dividend: 0.02 },
            INSULATION: { name: 'Insulation Products', basePrice: 30, volatility: 0.06, sector: 'Construction', dividend: 0.02 },
            BRICK: { name: 'Brick & Stone Co', basePrice: 32, volatility: 0.06, sector: 'Construction', dividend: 0.02 },
            LUMBER: { name: 'Lumber & Wood', basePrice: 37, volatility: 0.08, sector: 'Construction', dividend: 0.02 },
            DRYWALL: { name: 'Drywall Systems', basePrice: 33, volatility: 0.07, sector: 'Construction', dividend: 0.02 },
            CEMENT: { name: 'Cement Manufacturing', basePrice: 35, volatility: 0.07, sector: 'Construction', dividend: 0.03 },
            ASPHALT: { name: 'Asphalt Paving Co', basePrice: 38, volatility: 0.08, sector: 'Construction', dividend: 0.02 },
            EXCAVATION: { name: 'Excavation Services', basePrice: 34, volatility: 0.08, sector: 'Construction', dividend: 0.02 },
            SURVEYING: { name: 'Land Surveying Inc', basePrice: 39, volatility: 0.07, sector: 'Construction', dividend: 0.02 }
        };

        // Price history for each stock
        this.priceHistory = {};
        Object.keys(this.stocks).forEach(symbol => {
            this.priceHistory[symbol] = [this.stocks[symbol].basePrice];
        });

        this.initializeUI();
        this.update();
    }

    initializeUI() {
        // Populate company select
        const select = document.getElementById('company-select');
        Object.entries(this.stocks).forEach(([symbol, data]) => {
            const option = document.createElement('option');
            option.value = symbol;
            option.textContent = `${symbol} - ${data.name}`;
            select.appendChild(option);
        });

        // Event listeners
        select.addEventListener('change', (e) => this.updateTradeUI(e.target.value));
        document.getElementById('quantity').addEventListener('input', () => this.updateTradeTotal());
        document.getElementById('buy-btn').addEventListener('click', () => this.buyStock());
        document.getElementById('sell-btn').addEventListener('click', () => this.sellStock());
        document.getElementById('quick-next-day').addEventListener('click', () => this.nextDay());
        document.getElementById('loan-btn').addEventListener('click', () => this.borrowMoney());
        document.getElementById('repay-btn').addEventListener('click', () => this.repayLoan());
        document.getElementById('sell-all-btn').addEventListener('click', () => this.sellAll());
        document.getElementById('toggle-sidebar').addEventListener('click', () => this.toggleSidebar());
        
        // Search and filter
        document.getElementById('search-input').addEventListener('input', () => this.filterStocks());
        document.getElementById('sector-filter').addEventListener('change', () => this.filterStocks());

        // Modal listeners
        document.getElementById('modal-close').addEventListener('click', () => this.closeStockModal());
        document.getElementById('stock-modal').addEventListener('click', (e) => {
            if (e.target.id === 'stock-modal') this.closeStockModal();
        });
    }

    getCurrentPrice(symbol) {
        const history = this.priceHistory[symbol];
        return history[history.length - 1];
    }

    generateNewPrice(symbol) {
        const stock = this.stocks[symbol];
        const currentPrice = this.getCurrentPrice(symbol);
        
        // Check if there's a market event affecting this stock
        let eventMultiplier = 1;
        if (this.currentEvent && this.currentEvent.affectedSymbols.includes(symbol)) {
            eventMultiplier = this.currentEvent.priceMultiplier;
        }
        
        const change = (Math.random() - 0.5) * 2 * stock.volatility * eventMultiplier;
        const newPrice = Math.max(currentPrice * (1 + change), 1);
        this.priceHistory[symbol].push(parseFloat(newPrice.toFixed(2)));
    }

    getPortfolioValue() {
        let value = 0;
        Object.entries(this.holdings).forEach(([symbol, data]) => {
            const currentPrice = this.getCurrentPrice(symbol);
            value += data.shares * currentPrice;
        });
        return value;
    }

    getTotalAssets() {
        return this.cash + this.getPortfolioValue();
    }

    buyStock() {
        const symbol = document.getElementById('company-select').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (!symbol) {
            alert('Please select a stock');
            return;
        }

        const price = this.getCurrentPrice(symbol);
        const totalCost = price * quantity;

        if (totalCost > this.cash) {
            alert(`Insufficient funds! Need $${totalCost.toFixed(2)}, have $${this.cash.toFixed(2)}`);
            return;
        }

        // Add to holdings
        if (!this.holdings[symbol]) {
            this.holdings[symbol] = {
                name: this.stocks[symbol].name,
                shares: 0,
                purchasePrice: 0
            };
        }

        const oldTotal = this.holdings[symbol].shares * this.holdings[symbol].purchasePrice;
        this.holdings[symbol].shares += quantity;
        this.holdings[symbol].purchasePrice = (oldTotal + totalCost) / this.holdings[symbol].shares;

        this.cash -= totalCost;

        // Log transaction
        this.transactions.unshift(`BUY: ${quantity} shares of ${symbol} @ $${price.toFixed(2)} = $${totalCost.toFixed(2)}`);

        // Reset form
        document.getElementById('quantity').value = 1;
        document.getElementById('company-select').value = '';

        this.update();
    }

    sellStock() {
        const symbol = document.getElementById('company-select').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (!symbol || !this.holdings[symbol]) {
            alert('Select a stock you own');
            return;
        }

        if (quantity > this.holdings[symbol].shares) {
            alert(`You only own ${this.holdings[symbol].shares} shares`);
            return;
        }

        const price = this.getCurrentPrice(symbol);
        const totalRevenue = price * quantity;
        const profit = (price - this.holdings[symbol].purchasePrice) * quantity;

        this.cash += totalRevenue;
        this.holdings[symbol].shares -= quantity;

        if (this.holdings[symbol].shares === 0) {
            delete this.holdings[symbol];
        }

        // Log transaction
        const profitText = profit >= 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
        this.transactions.unshift(`SELL: ${quantity} shares of ${symbol} @ $${price.toFixed(2)} = $${totalRevenue.toFixed(2)} (${profitText})`);

        // Reset form
        document.getElementById('quantity').value = 1;
        document.getElementById('company-select').value = '';

        this.update();
    }

    updateTradeUI(symbol) {
        const price = symbol ? this.getCurrentPrice(symbol) : 'N/A';
        document.getElementById('selected-price').textContent = symbol ? `$${price.toFixed(2)}` : 'N/A';
        this.updateTradeTotal();
    }

    updateTradeTotal() {
        const symbol = document.getElementById('company-select').value;
        const quantity = parseInt(document.getElementById('quantity').value) || 0;
        const price = symbol ? this.getCurrentPrice(symbol) : 0;
        const total = price * quantity;

        document.getElementById('trade-total').textContent = `$${total.toFixed(2)}`;

        // Update button states
        const buyBtn = document.getElementById('buy-btn');
        const sellBtn = document.getElementById('sell-btn');

        buyBtn.disabled = !symbol || total > this.cash;
        sellBtn.disabled = !symbol || !this.holdings[symbol] || quantity > this.holdings[symbol].shares;
    }

    nextDay() {
        this.day++;
        this.daysPassed++;

        // Apply loan interest
        if (this.loan > 0) {
            const interest = this.loan * this.loanInterestRate;
            this.loan += interest;
            this.transactions.unshift(`💳 Loan interest charged: $${interest.toFixed(2)} (Total debt: $${this.loan.toFixed(2)})`);
        }

        // Generate market event (20% chance each day)
        if (Math.random() < 0.2) {
            this.generateMarketEvent();
        } else {
            this.currentEvent = null;
        }

        // Generate new prices
        Object.keys(this.stocks).forEach(symbol => {
            this.generateNewPrice(symbol);
        });

        // Calculate and apply dividends
        this.applyDividends();

        this.update();
    }

    generateMarketEvent() {
        const events = [
            {
                name: '📰 BREAKING: Tech Stocks Rally!',
                affectedSymbols: ['LIFEINVADER', 'TECHSTORE'],
                priceMultiplier: 1.3,
                description: 'Tech sector surges on innovation news'
            },
            {
                name: '📉 MARKET CRASH: Banking Crisis!',
                affectedSymbols: ['MAZE', 'BAWSAQ'],
                priceMultiplier: 0.7,
                description: 'Banking stocks plummet on economic concerns'
            },
            {
                name: '🌾 HARVEST SEASON: Agriculture Boom!',
                affectedSymbols: ['CORN', 'GOLD'],
                priceMultiplier: 1.25,
                description: 'Agricultural sector experiences strong growth'
            },
            {
                name: '🎬 ENTERTAINMENT SURGE!',
                affectedSymbols: ['LAZLOW', 'VINEWOOD'],
                priceMultiplier: 1.2,
                description: 'Entertainment industry reaches new heights'
            },
            {
                name: '🍗 FOOD SECTOR SLUMP',
                affectedSymbols: ['CLUCKIN'],
                priceMultiplier: 0.8,
                description: 'Food industry faces headwinds'
            }
        ];

        this.currentEvent = events[Math.floor(Math.random() * events.length)];
        this.transactions.unshift(`⚡ ${this.currentEvent.name}: ${this.currentEvent.description}`);
    }

    applyDividends() {
        let totalDividendsPaid = 0;
        Object.entries(this.holdings).forEach(([symbol, data]) => {
            const dividendPerShare = this.getCurrentPrice(symbol) * this.stocks[symbol].dividend;
            const totalDividend = dividendPerShare * data.shares;
            this.cash += totalDividend;
            totalDividendsPaid += totalDividend;
            this.totalDividends += totalDividend;
        });

        if (totalDividendsPaid > 0) {
            this.transactions.unshift(`💰 Dividends received: $${totalDividendsPaid.toFixed(2)}`);
        }
    }

    update() {
        // Update navigation bar
        document.getElementById('nav-cash').textContent = `$${this.cash.toFixed(0)}`;
        document.getElementById('nav-assets').textContent = `$${this.getTotalAssets().toFixed(0)}`;
        document.getElementById('nav-day').textContent = this.day;

        // Update sidebar
        document.getElementById('sidebar-cash').textContent = `$${this.cash.toFixed(2)}`;
        document.getElementById('sidebar-portfolio').textContent = `$${this.getPortfolioValue().toFixed(2)}`;
        document.getElementById('sidebar-total').textContent = `$${this.getTotalAssets().toFixed(2)}`;

        // Update stocks grid
        this.updateStocksGrid();

        // Update holdings
        this.updateHoldings();

        // Update transactions
        this.updateTransactions();

        // Update trade UI
        this.updateTradeTotal();

        // Update loan and stats
        this.updateLoanUI();
        this.updateStats();
    }

    borrowMoney() {
        const amount = parseFloat(prompt('Enter loan amount (max $5,000):'));
        if (isNaN(amount) || amount <= 0) return;
        if (amount > 5000) {
            alert('Maximum loan is $5,000');
            return;
        }

        this.loan += amount;
        this.cash += amount;
        this.transactions.unshift(`💳 Loan taken: $${amount.toFixed(2)} (Interest: 15% per day)`);
        this.update();
    }

    repayLoan() {
        if (this.loan === 0) {
            alert('You have no active loans');
            return;
        }

        const amount = parseFloat(prompt(`Enter repayment amount (Balance: $${this.loan.toFixed(2)}):`, this.loan));
        if (isNaN(amount) || amount <= 0) return;
        if (amount > this.cash) {
            alert('Insufficient funds');
            return;
        }

        this.cash -= amount;
        this.loan -= amount;
        this.transactions.unshift(`💳 Loan repaid: $${amount.toFixed(2)} (Remaining: $${this.loan.toFixed(2)})`);
        this.update();
    }

    updateLoanUI() {
        const loanElement = document.getElementById('sidebar-loan');
        if (loanElement) {
            if (this.loan > 0) {
                loanElement.textContent = `$${this.loan.toFixed(2)}`;
                loanElement.style.color = '#ff006e';
            } else {
                loanElement.textContent = 'None';
                loanElement.style.color = '#00ff88';
            }
        }
    }

    updateStats() {
        let bestStock = null;
        let bestPercent = -Infinity;
        let worstStock = null;
        let worstPercent = Infinity;

        Object.entries(this.stocks).forEach(([symbol, data]) => {
            const currentPrice = this.getCurrentPrice(symbol);
            const percentChange = ((currentPrice / data.basePrice) - 1) * 100;
            if (percentChange > bestPercent) {
                bestPercent = percentChange;
                bestStock = symbol;
            }
            if (percentChange < worstPercent) {
                worstPercent = percentChange;
                worstStock = symbol;
            }
        });

        const statsElement = document.getElementById('sidebar-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div style="margin-bottom: 8px;"><strong>📈 Top:</strong> ${bestStock}</div>
                <div style="margin-bottom: 8px;"><strong>📉 Bottom:</strong> ${worstStock}</div>
                <div style="margin-bottom: 8px;"><strong>💰 Earned:</strong> $${this.totalDividends.toFixed(2)}</div>
                <div><strong>📊 Holdings:</strong> ${Object.keys(this.holdings).length}</div>
            `;
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }

    filterStocks() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const sectorFilter = document.getElementById('sector-filter').value;
        const cards = document.querySelectorAll('.stock-card');

        cards.forEach(card => {
            const symbol = card.dataset.symbol;
            const stock = this.stocks[symbol];
            
            const matchesSearch = symbol.includes(searchTerm.toUpperCase()) || 
                                 stock.name.toLowerCase().includes(searchTerm);
            const matchesSector = !sectorFilter || stock.sector === sectorFilter;

            card.style.display = (matchesSearch && matchesSector) ? '' : 'none';
        });
    }

    sellAll() {
        if (Object.keys(this.holdings).length === 0) {
            alert('You have no stocks to sell');
            return;
        }

        Object.entries(this.holdings).forEach(([symbol, data]) => {
            const price = this.getCurrentPrice(symbol);
            const totalRevenue = price * data.shares;
            this.cash += totalRevenue;

            const profit = (price - data.purchasePrice) * data.shares;
            const profitText = profit >= 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
            this.transactions.unshift(`SELL ALL: ${data.shares} ${symbol} = $${totalRevenue.toFixed(2)} (${profitText})`);
        });

        this.holdings = {};
        this.update();
    }

    // Stock Detail Modal Functions
    openStockModal(symbol) {
        const stock = this.stocks[symbol];
        const currentPrice = this.getCurrentPrice(symbol);
        const history = this.priceHistory[symbol];
        const previousPrice = history[Math.max(0, history.length - 2)];
        const change = currentPrice - previousPrice;
        const percentChange = ((change / previousPrice) * 100).toFixed(2);

        // Update header
        document.getElementById('modal-symbol').textContent = symbol;
        document.getElementById('modal-name').textContent = stock.name;
        document.getElementById('modal-price').textContent = `$${currentPrice.toFixed(2)}`;
        
        const changeElement = document.getElementById('modal-change');
        changeElement.textContent = `${change >= 0 ? '+' : ''}${percentChange}%`;
        changeElement.style.color = change >= 0 ? '#00ff88' : '#ff006e';

        // Update stats
        this.updateModalStats(symbol, stock, history);

        // Draw chart
        this.drawPriceChart(symbol, history);

        // Analyze stock
        this.analyzeStock(symbol, stock, history);

        // Show modal
        document.getElementById('stock-modal').style.display = 'flex';

        // Setup quick buy
        const currentHoldings = this.holdings[symbol]?.shares || 0;
        document.getElementById('quick-quantity').value = 1;
        document.getElementById('quick-buy-btn').onclick = () => this.quickBuyFromModal(symbol);
    }

    updateModalStats(symbol, stock, history) {
        const high = Math.max(...history);
        const low = Math.min(...history);
        const avg = (history.reduce((a, b) => a + b) / history.length).toFixed(2);
        const volatility = (stock.volatility * 100).toFixed(1);
        const dividend = (stock.dividend * 100).toFixed(1);

        document.getElementById('stat-high').textContent = `$${high.toFixed(2)}`;
        document.getElementById('stat-low').textContent = `$${low.toFixed(2)}`;
        document.getElementById('stat-avg').textContent = `$${avg}`;
        document.getElementById('stat-vol').textContent = `${volatility}%`;
        document.getElementById('stat-div').textContent = `${dividend}%`;
    }

    drawPriceChart(symbol, history) {
        const canvas = document.getElementById('price-chart');
        const container = canvas.parentElement;
        
        // Set canvas size to match container
        canvas.width = container.clientWidth - 30;
        canvas.height = container.clientHeight - 30;
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get last 20 prices or all if less
        const displayHistory = history.slice(Math.max(0, history.length - 20));
        const min = Math.min(...displayHistory);
        const max = Math.max(...displayHistory);
        const range = max - min || 1;

        const padding = 40;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;
        const pointSpacing = width / (displayHistory.length - 1 || 1);

        // Draw axes
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Draw grid
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();

            // Labels
            ctx.fillStyle = '#aaa';
            ctx.font = '11px Arial';
            ctx.textAlign = 'right';
            const price = max - (range / 5) * i;
            ctx.fillText(`$${price.toFixed(0)}`, padding - 5, y + 3);
        }

        // Draw line chart
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();

        displayHistory.forEach((price, index) => {
            const x = padding + index * pointSpacing;
            const y = canvas.height - padding - ((price - min) / range) * height;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw gradient fill
        const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        displayHistory.forEach((price, index) => {
            const x = padding + index * pointSpacing;
            const y = canvas.height - padding - ((price - min) / range) * height;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.fill();

        // Draw points
        ctx.fillStyle = '#00ff88';
        displayHistory.forEach((price, index) => {
            const x = padding + index * pointSpacing;
            const y = canvas.height - padding - ((price - min) / range) * height;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Label
        ctx.fillStyle = '#aaa';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Last ${displayHistory.length} Days`, canvas.width / 2, canvas.height - 10);
    }

    analyzeStock(symbol, stock, history) {
        const current = history[history.length - 1];
        const previous = history[Math.max(0, history.length - 2)];
        const average = history.reduce((a, b) => a + b) / history.length;
        const high = Math.max(...history);
        const low = Math.min(...history);

        // Trend analysis
        let trend = 'SIDEWAYS';
        if (current > average * 1.05) {
            trend = 'UPTREND';
        } else if (current < average * 0.95) {
            trend = 'DOWNTREND';
        }

        // Price position
        let position = 'MID-RANGE';
        const range = high - low;
        const position_pct = (current - low) / range;
        if (position_pct > 0.75) {
            position = 'NEAR HIGH';
        } else if (position_pct < 0.25) {
            position = 'NEAR LOW';
        }

        // Momentum
        let momentum = 'NEUTRAL';
        const recentAvg = history.slice(-5).reduce((a, b) => a + b) / 5;
        if (current > recentAvg * 1.02) {
            momentum = 'BULLISH';
        } else if (current < recentAvg * 0.98) {
            momentum = 'BEARISH';
        }

        // Recommendation
        let recommendation = 'HOLD';
        let recommendationClass = 'neutral';
        
        if (position === 'NEAR LOW' && momentum !== 'BEARISH' && trend !== 'DOWNTREND') {
            recommendation = 'BUY';
            recommendationClass = 'bullish';
        } else if (position === 'NEAR HIGH' && (momentum === 'BEARISH' || trend === 'DOWNTREND')) {
            recommendation = 'SELL';
            recommendationClass = 'bearish';
        } else if (momentum === 'BULLISH' && trend === 'UPTREND') {
            recommendation = 'BUY';
            recommendationClass = 'bullish';
        }

        // Update UI
        document.getElementById('analysis-trend').textContent = trend;
        document.getElementById('analysis-trend').className = `analysis-badge ${trend === 'UPTREND' ? 'bullish' : trend === 'DOWNTREND' ? 'bearish' : 'neutral'}`;

        document.getElementById('analysis-position').textContent = position;
        document.getElementById('analysis-position').className = `analysis-badge ${position === 'NEAR LOW' ? 'bullish' : position === 'NEAR HIGH' ? 'bearish' : 'neutral'}`;

        document.getElementById('analysis-momentum').textContent = momentum;
        document.getElementById('analysis-momentum').className = `analysis-badge ${momentum === 'BULLISH' ? 'bullish' : momentum === 'BEARISH' ? 'bearish' : 'neutral'}`;

        document.getElementById('analysis-recommendation').textContent = recommendation;
        document.getElementById('analysis-recommendation').className = `analysis-badge recommendation ${recommendationClass}`;
    }

    quickBuyFromModal(symbol) {
        const quantity = parseInt(document.getElementById('quick-quantity').value);
        const price = this.getCurrentPrice(symbol);
        const totalCost = price * quantity;

        if (totalCost > this.cash) {
            alert(`Insufficient funds! Need $${totalCost.toFixed(2)}, have $${this.cash.toFixed(2)}`);
            return;
        }

        // Add to holdings
        if (!this.holdings[symbol]) {
            this.holdings[symbol] = {
                name: this.stocks[symbol].name,
                shares: 0,
                purchasePrice: 0
            };
        }

        const oldTotal = this.holdings[symbol].shares * this.holdings[symbol].purchasePrice;
        this.holdings[symbol].shares += quantity;
        this.holdings[symbol].purchasePrice = (oldTotal + totalCost) / this.holdings[symbol].shares;

        this.cash -= totalCost;
        this.transactions.unshift(`BUY: ${quantity} shares of ${symbol} @ $${price.toFixed(2)} = $${totalCost.toFixed(2)}`);

        alert(`✅ Bought ${quantity} shares of ${symbol} at $${price.toFixed(2)}`);
        this.closeStockModal();
        this.update();
    }

    closeStockModal() {
        document.getElementById('stock-modal').style.display = 'none';
    }

    updateStocksGrid() {
        const grid = document.getElementById('stocks-grid');
        grid.innerHTML = '';

        Object.entries(this.stocks).forEach(([symbol, data]) => {
            const currentPrice = this.getCurrentPrice(symbol);
            const history = this.priceHistory[symbol];
            const previousPrice = history[Math.max(0, history.length - 2)];
            const change = currentPrice - previousPrice;
            const percentChange = ((change / previousPrice) * 100).toFixed(2);

            const card = document.createElement('div');
            card.className = 'stock-card';
            card.dataset.symbol = symbol;
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="stock-header">
                    <div>
                        <div class="stock-symbol">${symbol}</div>
                        <div class="stock-name">${data.name.substring(0, 20)}</div>
                    </div>
                </div>
                <div class="stock-price">$${currentPrice.toFixed(2)}</div>
                <div class="price-change ${change >= 0 ? 'positive' : 'negative'}">
                    ${change >= 0 ? '📈' : '📉'} ${Math.abs(percentChange)}%
                </div>
                <div class="stock-chart-bar">
                    <div class="stock-chart-fill" style="width: ${50 + (currentPrice / data.basePrice - 1) * 50}%"></div>
                </div>
            `;

            card.addEventListener('click', () => this.openStockModal(symbol));
            grid.appendChild(card);
        });
    }

    updateHoldings() {
        const list = document.getElementById('holdings-list');
        list.innerHTML = '';

        if (Object.keys(this.holdings).length === 0) {
            list.innerHTML = '<div class="empty-state">No holdings yet</div>';
            return;
        }

        Object.entries(this.holdings).forEach(([symbol, data]) => {
            const currentPrice = this.getCurrentPrice(symbol);
            const currentValue = data.shares * currentPrice;
            const purchaseValue = data.shares * data.purchasePrice;
            const profit = currentValue - purchaseValue;
            const isPositive = profit >= 0;

            const item = document.createElement('div');
            item.className = 'holding-item';
            item.innerHTML = `
                <div class="holding-info">
                    <div class="holding-name">${symbol}</div>
                    <div class="holding-details">${data.shares} @ $${data.purchasePrice.toFixed(2)}</div>
                </div>
                <div class="holding-value ${isPositive ? 'positive' : 'negative'}">
                    $${currentValue.toFixed(2)}
                    <div style="font-size: 10px; margin-top: 2px;">${isPositive ? '+' : ''}$${profit.toFixed(2)}</div>
                </div>
            `;

            list.appendChild(item);
        });
    }

    updateTransactions() {
        const log = document.getElementById('transaction-log');
        log.innerHTML = '';

        this.transactions.slice(0, 10).forEach(transaction => {
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            if (transaction.includes('BUY')) {
                entry.classList.add('buy');
            } else if (transaction.includes('SELL')) {
                entry.classList.add('sell');
            }
            entry.textContent = transaction;
            log.appendChild(entry);
        });
    }

    winGame() {
        const modal = document.getElementById('win-modal');
        const totalAssets = this.getTotalAssets();
        const profit = totalAssets - 5000;
        const profitPercent = ((profit / 5000) * 100).toFixed(1);

        document.getElementById('win-message').textContent = 
            `You turned $5,000 into $${totalAssets.toFixed(2)}!\n+${profitPercent}% Profit in ${this.daysPassed} days!`;

        modal.style.display = 'flex';
    }


}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    new StockTradingGame();
});
