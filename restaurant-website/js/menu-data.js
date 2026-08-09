/**
 * Maison Élan — Complete Culinary Database
 * Includes: 30 Authentic Indian Starters
 *           50 Authentic Indian Main Courses
 *           25 Continental Main Courses
 *           25 Desserts
 *           25 Drinks & Beverages
 * Total: 155 Gourmet Delicacies
 */

const MENU_DATA = [
    /* ==========================================
       1. STARTERS (30 Authentic Indian Items)
       ========================================== */
    {
        id: 1,
        category: 'starters',
        name: 'Tandoori Paneer Tikka Angaara',
        price: '₹475',
        rating: 4.9,
        badge: 'Best Seller',
        desc: 'Cottage cheese marinated in smoky Mathania chillies, hung curd, and mustard oil, charred in tandoor.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 2,
        category: 'starters',
        name: 'Lucknowi Chicken Galouti Kebab',
        price: '₹595',
        rating: 5.0,
        badge: 'Best Seller',
        desc: 'Melt-in-mouth minced chicken patties infused with 32 secret aromatic spices, served on ulta tawa paratha.',
        img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80'
    },
    {
        id: 3,
        category: 'starters',
        name: 'Amritsari Fish Tikka Crisp',
        price: '₹625',
        rating: 4.9,
        badge: 'Best Seller',
        desc: 'River sole fish cubes coated in ajwain, gram flour, and lemon juice, crisp-fried Punjabi style.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 4,
        category: 'starters',
        name: 'Dahi Ke Shahi Kebab',
        price: '₹445',
        rating: 4.8,
        badge: 'Vegetarian',
        desc: 'Silky hung curd and green cardamom patties with a crisp panko coating and mint chutney.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 5,
        category: 'starters',
        name: 'Hara Bhara Kebab Stuffed',
        price: '₹415',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Spinach and green pea patties stuffed with spiced cottage cheese and roasted cashew nuts.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 6,
        category: 'starters',
        name: 'Tandoori Jumbo Tiger Prawns',
        price: '₹845',
        rating: 5.0,
        badge: 'Seafood',
        desc: 'Ocean tiger prawns marinated in yellow chilli paste, garlic butter, and smoked in clay oven.',
        img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80'
    },
    {
        id: 7,
        category: 'starters',
        name: 'Awadhi Mutton Seekh Kebab',
        price: '₹675',
        rating: 4.9,
        badge: 'Chef Special',
        desc: 'Hand-minced tender goat meat skewers seasoned with royal mace, mint, and grilled over charcoal.',
        img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80'
    },
    {
        id: 8,
        category: 'starters',
        name: 'Reshmi Malai Chicken Tikka',
        price: '₹565',
        rating: 4.8,
        badge: 'Popular',
        desc: 'Boneless chicken marinated in cashew paste, double cream, and white pepper, charbroiled till tender.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 9,
        category: 'starters',
        name: 'Royal Kakori Kebab',
        price: '₹685',
        rating: 5.0,
        badge: 'Heritage',
        desc: 'Ultra-tender lamb kebabs blended with rose water, saffron, and clove, baked on skewers.',
        img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80'
    },
    {
        id: 10,
        category: 'starters',
        name: 'Kashmiri Guchhi Morel Tikki',
        price: '₹595',
        rating: 4.9,
        badge: 'Exotic Spec.',
        desc: 'Rare Kashmiri wild morels stuffed with khoya and toasted nuts, tandoor roasted.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 11,
        category: 'starters',
        name: 'Old Delhi Samosa Ragda Chaat',
        price: '₹345',
        rating: 4.8,
        badge: 'Street Food',
        desc: 'Crispy potato samosas crushed over spiced white pea curry, tamarind chutney, and sweetened yoghurt.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 12,
        category: 'starters',
        name: 'Achari Paneer Tikka',
        price: '₹485',
        rating: 4.8,
        badge: 'Vegetarian',
        desc: 'Cottage cheese chunks coated in pickled mango spices, kalonji, and mustard oil.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 13,
        category: 'starters',
        name: 'Bhatti Ka Murgh Tikka',
        price: '₹585',
        rating: 4.9,
        badge: 'Tandoori',
        desc: 'Chicken leg meat marinated in crushed black peppercorn, garlic, and cooked over bhatti charcoal.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 14,
        category: 'starters',
        name: 'Crispy Kurkuri Bhindi Chaat',
        price: '₹375',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Julienned okra tossed in amchur, chaat masala, and chickpea flour, fried light and crispy.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 15,
        category: 'starters',
        name: 'Tandoori Broccoli Malai',
        price: '₹465',
        rating: 4.8,
        badge: 'Healthy Veg',
        desc: 'Fresh broccoli florets marinated in processed cheese, cream, cardamom, and roasted in tandoor.',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
    },
    {
        id: 16,
        category: 'starters',
        name: 'Chicken Tikka Angaara Spicy',
        price: '₹595',
        rating: 4.9,
        badge: 'Spicy',
        desc: 'Fiery chicken tikka coated in red chilli paste, garlic, and finished with a charcoal smoke infusion.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 17,
        category: 'starters',
        name: 'Mutton Boti Kebab Dry',
        price: '₹695',
        rating: 4.9,
        badge: 'Mutton',
        desc: 'Tender boneless mutton cubes marinated in raw papaya, green chilli, and pan-seared with ghee.',
        img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80'
    },
    {
        id: 18,
        category: 'starters',
        name: 'Stuffed Mushroom Tikka Dulari',
        price: '₹475',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Button mushrooms stuffed with processed cheese, bell peppers, and herbs, cooked in clay oven.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 19,
        category: 'starters',
        name: 'Royal Subz Seekh Kebab',
        price: '₹425',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Finely minced garden vegetables, lentils, and potatoes skewered and roasted with ghee.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 20,
        category: 'starters',
        name: 'Surti Locho Tikki Bites',
        price: '₹395',
        rating: 4.6,
        badge: 'Gujarati Fusion',
        desc: 'Steamed lentil cake bites tempered with mustard seeds, green chillies, butter, and sev.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 21,
        category: 'starters',
        name: 'Kolkata Fish Cutlet Classic',
        price: '₹545',
        rating: 4.8,
        badge: 'Bengali Spec.',
        desc: 'Bhetki fish fillet marinated in mustard, garlic, and green chillies, breaded and deep fried.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 22,
        category: 'starters',
        name: 'Paneer Malai Tikka Saffron',
        price: '₹495',
        rating: 4.9,
        badge: 'Rich Veg',
        desc: 'Cottage cheese steeped in cream, saffron strands, mace powder, and charbroiled.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 23,
        category: 'starters',
        name: 'Tangri Kebab Stuffed Cheese',
        price: '₹625',
        rating: 4.9,
        badge: 'Poultry',
        desc: 'Chicken drumsticks stuffed with minced chicken and melted cheese, cooked in tandoor.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 24,
        category: 'starters',
        name: 'Chana Jor Garam Papdi Chaat',
        price: '₹325',
        rating: 4.7,
        badge: 'Street Chaat',
        desc: 'Flattened black chickpeas tossed with chopped onions, tomatoes, green chillies, and lemon juice.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 25,
        category: 'starters',
        name: 'Crispy Honey Lotus Stem',
        price: '₹435',
        rating: 4.8,
        badge: 'Indo-Chinese',
        desc: 'Thin slices of lotus root fried crisp and tossed in garlic, honey, and chilli glaze.',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
    },
    {
        id: 26,
        category: 'starters',
        name: 'Kadhai Paneer Finger Bites',
        price: '₹445',
        rating: 4.7,
        badge: 'Crispy Veg',
        desc: 'Crispy fried cottage cheese batons tossed with bell peppers and roasted kadhai spices.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 27,
        category: 'starters',
        name: 'Kalmi Kebab Saffron Glaze',
        price: '₹645',
        rating: 4.9,
        badge: 'Mughlai',
        desc: 'Chicken thigh pieces marinated in yogurt, cashew paste, and saffron, broiled over coals.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 28,
        category: 'starters',
        name: 'Aloo Corn Cheese Tikki',
        price: '₹385',
        rating: 4.7,
        badge: 'Kid Favorite',
        desc: 'Mashed potato and sweet corn patties filled with mozzarella cheese, shallow fried on tawa.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 29,
        category: 'starters',
        name: 'Hydrabadi Shikampuri Kebab',
        price: '₹695',
        rating: 5.0,
        badge: 'Royal Special',
        desc: 'Spiced minced lamb patties stuffed with hung curd and chopped onions, shallow fried in ghee.',
        img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80'
    },
    {
        id: 30,
        category: 'starters',
        name: 'Tandoori Soya Chaap Angaara',
        price: '₹465',
        rating: 4.8,
        badge: 'Veg Tikka',
        desc: 'Protein-packed soya chaap marinated in red chilli yogurt paste, grilled to perfection.',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },

    /* ==========================================
       2. INDIAN MAIN COURSE (50 Authentic Items)
       ========================================== */
    {
        id: 31,
        category: 'indian_mains',
        name: 'Paneer Velvet Butter Masala',
        price: '₹595',
        rating: 4.9,
        badge: 'Best Seller',
        desc: 'Soft malai paneer cubes simmered in a silky tomato, cashew nut, and kasuri methi gravy with honey touch.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80'
    },
    {
        id: 32,
        category: 'indian_mains',
        name: 'Maison Murgh Makhani (Butter Chicken)',
        price: '₹695',
        rating: 5.0,
        badge: 'Best Seller',
        desc: 'Charcoal-grilled tandoori chicken cooked in a rich cult-butter gravy infused with fenugreek and cream.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 33,
        category: 'indian_mains',
        name: 'Dal Élan (24-Hour Slow Cooked)',
        price: '₹495',
        rating: 5.0,
        badge: 'Best Seller',
        desc: 'Whole black lentils simmered overnight on slow charcoal with cream, white butter, and secret spices.',
        img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80'
    },
    {
        id: 34,
        category: 'indian_mains',
        name: 'Hyderabadi Dum Mutton Biryani',
        price: '₹795',
        rating: 4.9,
        badge: 'Royal Rice',
        desc: 'Aromatic long-grain basmati rice and succulent tender goat meat cooked on dum with mint and saffron.',
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80'
    },
    {
        id: 35,
        category: 'indian_mains',
        name: 'Kashmiri Lamb Rogan Josh',
        price: '₹765',
        rating: 4.8,
        badge: 'Regional Spec.',
        desc: 'Tender baby lamb shanks braised in a fragrant crimson gravy of Ratanjot, Kashmiri chilli, and fennel.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 36,
        category: 'indian_mains',
        name: 'Awadhi Dum Subz Biryani',
        price: '₹545',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Seasonal vegetables, cottage cheese, and fragrant kewra-infused basmati rice sealed in clay pot.',
        img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80'
    },
    {
        id: 37,
        category: 'indian_mains',
        name: 'Malai Kofta Imperial',
        price: '₹575',
        rating: 4.8,
        badge: 'Vegetarian',
        desc: 'Cottage cheese and golden raisin dumplings submerged in a white velvety cashew and melon seed gravy.',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80'
    },
    {
        id: 38,
        category: 'indian_mains',
        name: 'Kadhai Jumbo Tiger Prawns',
        price: '₹895',
        rating: 4.9,
        badge: 'Seafood',
        desc: 'Fresh sea prawns tossed with bell peppers, coarse roasted coriander, red chillies, and rich onion gravy.',
        img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80'
    },
    {
        id: 39,
        category: 'indian_mains',
        name: 'Chicken Tikka Masala Classic',
        price: '₹675',
        rating: 4.8,
        badge: 'Popular',
        desc: 'Boneless grilled chicken tikka morsels simmered in a spicy, tangy onion-tomato makhani gravy.',
        img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80'
    },
    {
        id: 40,
        category: 'indian_mains',
        name: 'Velvet Palak Paneer',
        price: '₹565',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Fresh spinach purée cooked with garlic, nutmeg, and soft cottage cheese cubes drizzled with fresh cream.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 41,
        category: 'indian_mains',
        name: 'Old Delhi Nalli Nihari',
        price: '₹845',
        rating: 5.0,
        badge: 'Chef Specialty',
        desc: 'Slow-cooked lamb shank stew simmered for 8 hours with bone marrow, rose petals, and whole spices.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 42,
        category: 'indian_mains',
        name: 'Goan Fish Curry w/ Coconut',
        price: '₹725',
        rating: 4.8,
        badge: 'Coastal Spec.',
        desc: 'Catch of the day cooked in fresh coconut milk, kokum, tamarind, and aromatic red Goan chillies.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 43,
        category: 'indian_mains',
        name: 'Mutton Bhuna Gosht Special',
        price: '₹745',
        rating: 4.9,
        badge: 'Mutton',
        desc: 'Pan-roasted tender goat meat cooked down in a thick spicy onion, tomato, and black pepper reduction.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 44,
        category: 'indian_mains',
        name: 'Kaju Khoya Butter Masala',
        price: '₹585',
        rating: 4.8,
        badge: 'Rich Veg',
        desc: 'Whole toasted cashew nuts simmered in a mildly sweet, aromatic khoya, cream, and mace curry.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80'
    },
    {
        id: 45,
        category: 'indian_mains',
        name: 'Rajasthani Laal Maas',
        price: '₹785',
        rating: 4.9,
        badge: 'Spicy Landmark',
        desc: 'Fiery lamb curry prepared with whole Mathania red chillies, mustard oil, and smoked charcoal dhungar.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 46,
        category: 'indian_mains',
        name: 'Smoky Baingan Bharta',
        price: '₹485',
        rating: 4.6,
        badge: 'Rustic Veg',
        desc: 'Fire-roasted eggplant mashed and sautéed with chopped tomatoes, garlic, ginger, and green chillies.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 47,
        category: 'indian_mains',
        name: 'Chettinad Pepper Chicken Curry',
        price: '₹665',
        rating: 4.8,
        badge: 'South Special',
        desc: 'Fiery chicken dish seasoned with freshly ground Tellicherry black pepper, curry leaves, and coconut.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 48,
        category: 'indian_mains',
        name: 'Banarasi Stuffed Dum Aloo',
        price: '₹495',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Scooped baby potatoes stuffed with cottage cheese and nuts, slow-cooked in a tangy yogurt tomato gravy.',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80'
    },
    {
        id: 49,
        category: 'indian_mains',
        name: 'Amritsari Macchi Curry',
        price: '₹715',
        rating: 4.8,
        badge: 'North Fish',
        desc: 'Crispy fried river sole fish cooked in a rustic Punjabi spiced tomato and mustard gravy.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 50,
        category: 'indian_mains',
        name: 'Paneer Lababdar Royal',
        price: '₹585',
        rating: 4.9,
        badge: 'Favorite Veg',
        desc: 'Grated and cubed paneer cooked with bell peppers, tomatoes, garlic, and rich cashew gravy.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80'
    },
    {
        id: 51,
        category: 'indian_mains',
        name: 'Dum Chicken Biryani Royale',
        price: '₹695',
        rating: 4.9,
        badge: 'Biryani Spec.',
        desc: 'Layered saffron basmati rice with marinated chicken, fried onions, mint, and clarified butter.',
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80'
    },
    {
        id: 52,
        category: 'indian_mains',
        name: 'Awadhi Shahi Mutton Korma',
        price: '₹795',
        rating: 4.9,
        badge: 'Royal Dish',
        desc: 'Rich almond and saffron lamb braise infused with kewra water and green cardamom.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 53,
        category: 'indian_mains',
        name: 'Rawalpindi Pindi Chana',
        price: '₹445',
        rating: 4.7,
        badge: 'Traditional Veg',
        desc: 'Dark spiced chickpeas infused with tea leaves, dried pomegranate seeds, and ginger juliennes.',
        img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80'
    },
    {
        id: 54,
        category: 'indian_mains',
        name: 'Sarson Ka Saag & Makki Roti',
        price: '₹525',
        rating: 4.8,
        badge: 'Winter Classic',
        desc: 'Traditional mustard greens mashed with white butter, served with two cornflour breads and jaggery.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 55,
        category: 'indian_mains',
        name: 'Dum Prawn Biryani Gold',
        price: '₹865',
        rating: 5.0,
        badge: 'Seafood Biryani',
        desc: 'Fresh ocean tiger prawns dum cooked with aged basmati rice, saffron, and fresh herbs.',
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80'
    },
    {
        id: 56,
        category: 'indian_mains',
        name: 'Kadhai Paneer Special',
        price: '₹575',
        rating: 4.8,
        badge: 'Vegetarian',
        desc: 'Fresh paneer cooked with coarsely pounded coriander seeds, red chillies, and crunchy capsicum.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80'
    },
    {
        id: 57,
        category: 'indian_mains',
        name: 'Murgh Handi Lazeez',
        price: '₹685',
        rating: 4.9,
        badge: 'Claypot Spec.',
        desc: 'Boneless chicken simmered in an earthenware pot with curd, cashew cream, and crushed fenugreek.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 58,
        category: 'indian_mains',
        name: 'Mutton Rara Ghugni',
        price: '₹785',
        rating: 4.9,
        badge: 'Mutton',
        desc: 'Combination of minced lamb and lamb chunks cooked together in a rich spicy gravy.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 59,
        category: 'indian_mains',
        name: 'Methi Matar Malai Velvet',
        price: '₹535',
        rating: 4.7,
        badge: 'Rich Veg',
        desc: 'Fresh green peas and bitter fenugreek leaves cooked in a rich sweet cream and cashew nut curry.',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80'
    },
    {
        id: 60,
        category: 'indian_mains',
        name: 'Bengali Shorshe Ilish (Hilsa Mustard)',
        price: '₹895',
        rating: 5.0,
        badge: 'Heritage Fish',
        desc: 'Fresh Hilsa fish cooked in a sharp yellow mustard and green chilli sauce with mustard oil.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 61,
        category: 'indian_mains',
        name: 'Paneer Pasanda Nawabi',
        price: '₹595',
        rating: 4.8,
        badge: 'Royal Veg',
        desc: 'Stuffed paneer sandwiches with raisins and nuts, cooked in a golden saffron onion gravy.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80'
    },
    {
        id: 62,
        category: 'indian_mains',
        name: 'Chicken Saagwala Punjabi',
        price: '₹645',
        rating: 4.7,
        badge: 'Healthy Poultry',
        desc: 'Tender chicken pieces simmered in fresh pureed spinach, garlic, ginger, and butter.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 63,
        category: 'indian_mains',
        name: 'Dal Tadka Desi Ghee',
        price: '₹425',
        rating: 4.8,
        badge: 'Comfort Food',
        desc: 'Yellow arhar lentils tempered with cow ghee, cumin seeds, garlic, dried red chillies, and asafoetida.',
        img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80'
    },
    {
        id: 64,
        category: 'indian_mains',
        name: 'Malabar Fish Curry Kerala',
        price: '₹745',
        rating: 4.9,
        badge: 'South Seafood',
        desc: 'Seer fish cooked in a tangy coconut gravy with Kudampuli tamarind and roasted spices.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 65,
        category: 'indian_mains',
        name: 'Kashmiri Dum Aloo Gravy',
        price: '₹495',
        rating: 4.7,
        badge: 'Kashmiri',
        desc: 'Pricked baby potatoes slow cooked in a fennel and dry ginger spiced red yogurt gravy.',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80'
    },
    {
        id: 66,
        category: 'indian_mains',
        name: 'Murgh Do Pyaza',
        price: '₹655',
        rating: 4.8,
        badge: 'Classic',
        desc: 'Chicken cooked with double onions — translucent rings and caramelized purée with whole spices.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 67,
        category: 'indian_mains',
        name: 'Mutton Keema Matar Masala',
        price: '₹745',
        rating: 4.9,
        badge: 'Mutton',
        desc: 'Coarsely minced mutton braised with green peas, onions, tomatoes, and whole garam masala.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 68,
        category: 'indian_mains',
        name: 'Paneer Makhani Saffron',
        price: '₹585',
        rating: 4.8,
        badge: 'Mild Veg',
        desc: 'Cottage cheese cooked in sweet tomato butter gravy scented with Spanish saffron.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80'
    },
    {
        id: 69,
        category: 'indian_mains',
        name: 'Chicken Kolhapuri Fiery',
        price: '₹665',
        rating: 4.9,
        badge: 'Spicy Maharashtra',
        desc: 'Spicy chicken curry prepared with sesame, poppy seeds, dry coconut, and red Kolhapuri chillies.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 70,
        category: 'indian_mains',
        name: 'Bhindi Masala Restaurant Style',
        price: '₹445',
        rating: 4.6,
        badge: 'Veg',
        desc: 'Tender ladyfingers sautéed with sliced onions, amchur, cumin, and roasted coriander.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 71,
        category: 'indian_mains',
        name: 'Hyderabadi Mirchi Ka Salan',
        price: '₹425',
        rating: 4.7,
        badge: 'Side Spec.',
        desc: 'Large green chillies cooked in a peanut, sesame, coconut, and tamarind gravy.',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    },
    {
        id: 72,
        category: 'indian_mains',
        name: 'Murgh Musallam Whole (Half)',
        price: '₹795',
        rating: 5.0,
        badge: 'Royal Feast',
        desc: 'Mughlai dish of chicken cooked in a rich gravy of boiled eggs, minced meat, and dry fruits.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 73,
        category: 'indian_mains',
        name: 'Mutton Beliram Punjab',
        price: '₹795',
        rating: 4.9,
        badge: 'Heritage Mutton',
        desc: 'Tender goat meat cooked with equal amount of sliced onions, yogurt, and crushed coriander.',
        img: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80'
    },
    {
        id: 74,
        category: 'indian_mains',
        name: 'Subz Handi Diwani',
        price: '₹525',
        rating: 4.7,
        badge: 'Mixed Veg',
        desc: 'Assorted garden vegetables cooked in a rich spinach and cashew nut gravy.',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80'
    },
    {
        id: 75,
        category: 'indian_mains',
        name: 'Lobster Masala Coastal Style',
        price: '₹1,495',
        rating: 5.0,
        badge: 'Luxury Seafood',
        desc: 'Fresh rock lobster meat sautéed with South Indian curry leaves, mustard seeds, and shallots.',
        img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80'
    },
    {
        id: 76,
        category: 'indian_mains',
        name: 'Paneer Bhurji Dhaba Style',
        price: '₹495',
        rating: 4.8,
        badge: 'Dhaba Style',
        desc: 'Scrambled cottage cheese tossed with green chillies, tomatoes, butter, and coriander.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80'
    },
    {
        id: 77,
        category: 'indian_mains',
        name: 'Kadhai Chicken Peshavari',
        price: '₹675',
        rating: 4.8,
        badge: 'North Special',
        desc: 'Chicken cooked in a wok with coarse spices, fresh tomatoes, and green chilli slits.',
        img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'
    },
    {
        id: 78,
        category: 'indian_mains',
        name: 'Jeera Rice Basmati Fluffy',
        price: '₹295',
        rating: 4.8,
        badge: 'Staple Rice',
        desc: 'Long-grain basmati rice tempered with roasted cumin seeds and desi ghee.',
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80'
    },
    {
        id: 79,
        category: 'indian_mains',
        name: 'Garlic Butter Naan Basket',
        price: '₹195',
        rating: 4.9,
        badge: 'Bread',
        desc: 'Two fluffy tandoori sourdough naans brushed with garlic butter and fresh coriander.',
        img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80'
    },
    {
        id: 80,
        category: 'indian_mains',
        name: 'Amritsari Kulcha Stuffed Potato',
        price: '₹225',
        rating: 4.9,
        badge: 'Special Bread',
        desc: 'Crispy layered tandoori bread filled with spiced mashed potatoes, served with chole gravy.',
        img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80'
    },

    /* ==========================================
       3. CONTINENTAL MAIN COURSE (25 Items)
       ========================================== */
    {
        id: 81,
        category: 'continental_mains',
        name: 'Handcrafted Black Truffle Pasta',
        price: '₹1,195',
        rating: 5.0,
        badge: 'Best Seller',
        desc: 'Handmade fresh egg pappardelle with shaved Italian black truffle, 24-month aged parmesan, and sage butter.',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
    },
    {
        id: 82,
        category: 'continental_mains',
        name: 'Pan-Seared Norwegian Salmon',
        price: '₹1,495',
        rating: 4.9,
        badge: 'Featured',
        desc: 'Wild salmon fillet served over lemon-dill hollandaise, charred asparagus, and crushed new potatoes.',
        img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80'
    },
    {
        id: 83,
        category: 'continental_mains',
        name: 'Creamy Wild Mushroom Risotto',
        price: '₹1,095',
        rating: 4.8,
        badge: 'Italian Classic',
        desc: 'Slow-cooked Arborio rice with porcini, shiitake, and cremini mushrooms in truffle parmesan broth.',
        img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80'
    },
    {
        id: 84,
        category: 'continental_mains',
        name: 'Prime Black Angus Ribeye (250g)',
        price: '₹1,895',
        rating: 5.0,
        badge: 'Steakhouse',
        desc: 'Prime grain-fed ribeye steak charred over lava rocks, served with truffle butter and red wine jus.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
        id: 85,
        category: 'continental_mains',
        name: 'Wood-Fired Margherita Gourmet',
        price: '₹895',
        rating: 4.8,
        badge: 'Pizza',
        desc: 'Sourdough crust topped with San Marzano tomato sauce, fresh buffalo mozzarella, and sweet basil oil.',
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80'
    },
    {
        id: 86,
        category: 'continental_mains',
        name: 'Classic Lobster Thermidor',
        price: '₹2,295',
        rating: 5.0,
        badge: 'Luxury Seafood',
        desc: 'Whole rock lobster tail baked in its shell with a creamy brandy, Dijon mustard, and Gruyère sauce.',
        img: 'https://images.unsplash.com/photo-1559742811-8228636464e3?w=600&q=80'
    },
    {
        id: 87,
        category: 'continental_mains',
        name: 'Crispy Duck Confit w/ Cherry Reduction',
        price: '₹1,595',
        rating: 4.9,
        badge: 'French Classic',
        desc: 'Slow-cured French duck leg crispy roasted, served with spiced cherry reduction and potato Anna.',
        img: 'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?w=600&q=80'
    },
    {
        id: 88,
        category: 'continental_mains',
        name: 'Chicken Piccata Lemon Caper',
        price: '₹945',
        rating: 4.7,
        badge: 'Poultry',
        desc: 'Pan-seared tender chicken breast in a tangy lemon butter sauce with nonpareil capers and angel hair pasta.',
        img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80'
    },
    {
        id: 89,
        category: 'continental_mains',
        name: 'Grilled Sea Bass Florentine',
        price: '₹1,425',
        rating: 4.8,
        badge: 'Seafood',
        desc: 'Fillet of Mediterranean sea bass served over sautéed garlic spinach and citrus reduction.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 90,
        category: 'continental_mains',
        name: 'Herb-Crusted Rack of Lamb',
        price: '₹1,795',
        rating: 4.9,
        badge: 'Chef Special',
        desc: 'New Zealand lamb rack coated in fresh parsley and panko crumbs, served with potato purée and mint jus.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
        id: 91,
        category: 'continental_mains',
        name: 'Seafood Linguine Marinara',
        price: '₹1,245',
        rating: 4.8,
        badge: 'Pasta',
        desc: 'Fresh linguine tossed with clams, tiger prawns, calamari, white wine, and roasted garlic tomato sauce.',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
    },
    {
        id: 92,
        category: 'continental_mains',
        name: 'Veal Osso Buco Braised',
        price: '₹1,695',
        rating: 4.9,
        badge: 'Milanese Classic',
        desc: 'Cross-cut veal shank braised with vegetables, white wine, and broth, garnished with fresh gremolata.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
        id: 93,
        category: 'continental_mains',
        name: 'Spinach & Ricotta Ravioli',
        price: '₹985',
        rating: 4.7,
        badge: 'Handmade Pasta',
        desc: 'Handmade pasta parcels stuffed with baby spinach and buffalo ricotta in sage brown butter sauce.',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
    },
    {
        id: 94,
        category: 'continental_mains',
        name: 'Filet Mignon w/ Béarnaise',
        price: '₹1,995',
        rating: 5.0,
        badge: 'Prime Beef',
        desc: 'Center-cut tenderloin steak grilled to medium rare, served with classic tarragon Béarnaise and fries.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
        id: 95,
        category: 'continental_mains',
        name: 'Classic Quiche Lorraine',
        price: '₹785',
        rating: 4.6,
        badge: 'French Bistro',
        desc: 'Flaky butter pastry tart filled with smoked bacon lardons, Gruyère cheese, and rich egg custard.',
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80'
    },
    {
        id: 96,
        category: 'continental_mains',
        name: 'Gnocchi Gorgonzola & Walnut',
        price: '₹925',
        rating: 4.8,
        badge: 'Vegetarian',
        desc: 'Pillow-soft potato gnocchi tossed in a creamy Italian Gorgonzola cheese sauce with toasted walnuts.',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
    },
    {
        id: 97,
        category: 'continental_mains',
        name: 'Roasted Chicken Supreme',
        price: '₹995',
        rating: 4.7,
        badge: 'Poultry',
        desc: 'Corn-fed chicken breast with bone-in skin crispy roasted, served with truffle polenta and jus.',
        img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80'
    },
    {
        id: 98,
        category: 'continental_mains',
        name: 'Paella de Mariscos Supreme',
        price: '₹1,395',
        rating: 4.9,
        badge: 'Spanish Rice',
        desc: 'Authentic bomba rice cooked with saffron, calamari, prawns, mussels, and roasted bell peppers.',
        img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80'
    },
    {
        id: 99,
        category: 'continental_mains',
        name: 'Slow-BBQ Glazed Pork Ribs',
        price: '₹1,195',
        rating: 4.9,
        badge: 'Grill',
        desc: 'Tender baby back pork ribs braised for 6 hours, slathered in honey hickory bourbon BBQ sauce.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
        id: 100,
        category: 'continental_mains',
        name: 'Vegetable Lasagna al Forno',
        price: '₹865',
        rating: 4.7,
        badge: 'Vegetarian',
        desc: 'Layered pasta sheets with grilled zucchini, aubergine, San Marzano sauce, and melted mozzarella.',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
    },
    {
        id: 101,
        category: 'continental_mains',
        name: 'Chilean Sea Bass En Papillote',
        price: '₹1,845',
        rating: 5.0,
        badge: 'Exotic Sea',
        desc: 'Fresh Chilean sea bass baked in parchment paper with cherry tomatoes, fennel, and white wine butter.',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
    },
    {
        id: 102,
        category: 'continental_mains',
        name: 'Truffle Mac & Cheese Royale',
        price: '₹845',
        rating: 4.8,
        badge: 'Comfort Food',
        desc: 'Elbow macaroni tossed in fontina, Gruyère, and aged cheddar cheese sauce topped with black truffle crumbs.',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
    },
    {
        id: 103,
        category: 'continental_mains',
        name: 'Beef Wellington Prime',
        price: '₹2,195',
        rating: 5.0,
        badge: 'Iconic Classic',
        desc: 'Tenderloin beef coated in mushroom duxelles and prosciutto, wrapped in puff pastry and baked golden.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
        id: 104,
        category: 'continental_mains',
        name: 'Saffron Seafood Risotto',
        price: '₹1,295',
        rating: 4.9,
        badge: 'Risotto',
        desc: 'Creamy Spanish saffron risotto cooked with scallops, tiger prawns, clams, and parmesan froth.',
        img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80'
    },
    {
        id: 105,
        category: 'continental_mains',
        name: 'Crispy Chicken Parmigiana Melt',
        price: '₹945',
        rating: 4.8,
        badge: 'Popular',
        desc: 'Breaded chicken breast baked with rich marinara sauce, fresh mozzarella, and parmigiano.',
        img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80'
    },

    /* ==========================================
       4. DESSERTS (25 Items)
       ========================================== */
    {
        id: 106,
        category: 'desserts',
        name: 'Valrhona Dark Chocolate Fondant',
        price: '₹595',
        rating: 5.0,
        badge: 'Best Seller',
        desc: 'Warm dark chocolate lava cake with a molten 70% Valrhona center, Madagascar vanilla gelato, and edible gold dust.',
        img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80'
    },
    {
        id: 107,
        category: 'desserts',
        name: 'Classic Venetian Tiramisu',
        price: '₹495',
        rating: 4.9,
        badge: 'Italian Classic',
        desc: 'Traditional espresso-soaked savoiardi biscuits layered with fluffy mascarpone cream and Valrhona cocoa.',
        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80'
    },
    {
        id: 108,
        category: 'desserts',
        name: 'Vanilla Bean Crème Brûlée',
        price: '₹465',
        rating: 4.8,
        badge: 'French Classic',
        desc: 'Rich Madagascar vanilla custard base topped with a layer of caramelized brittle sugar.',
        img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80'
    },
    {
        id: 109,
        category: 'desserts',
        name: 'Gulab Jamun Cheesecake Fusion',
        price: '₹485',
        rating: 4.9,
        badge: 'Indo-Fusion',
        desc: 'Creamy New York cheesecake baked with warm gulab jamuns inside, served with pistachios and rose syrup.',
        img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80'
    },
    {
        id: 110,
        category: 'desserts',
        name: 'Pistachio Baklava w/ Kulfi',
        price: '₹525',
        rating: 4.8,
        badge: 'Middle Eastern',
        desc: 'Flaky filo pastry sheets stuffed with roasted Gaziantep pistachios, served with cardamom kulfi.',
        img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=80'
    },
    {
        id: 111,
        category: 'desserts',
        name: 'Artisan Churros w/ Dulce de Leche',
        price: '₹425',
        rating: 4.7,
        badge: 'Spanish',
        desc: 'Crispy fried dough sticks dusted with cinnamon sugar, served with warm chocolate and caramel dipping sauces.',
        img: 'https://images.unsplash.com/photo-1624371350106-2920e4ad608f?w=600&q=80'
    },
    {
        id: 112,
        category: 'desserts',
        name: 'French Macarons Assortment',
        price: '₹495',
        rating: 4.9,
        badge: 'Parisian Patisserie',
        desc: 'Set of 6 almond macarons featuring rose, pistachio, salted caramel, dark chocolate, passion fruit, and vanilla.',
        img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=80'
    },
    {
        id: 113,
        category: 'desserts',
        name: 'Mango Passion Panna Cotta',
        price: '₹445',
        rating: 4.8,
        badge: 'Chilled Dessert',
        desc: 'Silky Italian cooked cream infused with vanilla bean, topped with Alphonso mango and passion fruit coulis.',
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80'
    },
    {
        id: 114,
        category: 'desserts',
        name: 'Rasmalai Tres Leches Cake',
        price: '₹515',
        rating: 4.9,
        badge: 'Fusion Special',
        desc: 'Sponge cake soaked in three milks infused with saffron, cardamom, and soft rasmalai curd.',
        img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80'
    },
    {
        id: 115,
        category: 'desserts',
        name: 'New York Baked Cheesecake',
        price: '₹545',
        rating: 4.9,
        badge: 'Classic NYC',
        desc: 'Dense, creamy baked cheese cake on a graham cracker crust, served with fresh wild berry compote.',
        img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80'
    },
    {
        id: 116,
        category: 'desserts',
        name: 'Warm Tarte Tatin & Vanilla Gelato',
        price: '₹475',
        rating: 4.8,
        badge: 'French Pie',
        desc: 'Classic upside-down caramelized apple tart with puff pastry base, served warm with vanilla bean ice cream.',
        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80'
    },
    {
        id: 117,
        category: 'desserts',
        name: 'Chocolate Hazelnut Gianduja Tart',
        price: '₹525',
        rating: 4.9,
        badge: 'Rich Chocolate',
        desc: 'Dark chocolate ganache and roasted hazelnut praline tart topped with sea salt flakes.',
        img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80'
    },
    {
        id: 118,
        category: 'desserts',
        name: 'Shahi Tukda Gold Edition',
        price: '₹455',
        rating: 4.8,
        badge: 'Royal Awadhi',
        desc: 'Crispy ghee-fried bread soaked in saffron rabri, garnished with silver leaf, almonds, and pistachio.',
        img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80'
    },
    {
        id: 119,
        category: 'desserts',
        name: 'Salted Caramel Hot Soufflé',
        price: '₹565',
        rating: 4.9,
        badge: 'Soufflé',
        desc: 'Fluffy warm soufflé baked to order with sea-salted caramel center, served with chantilly cream.',
        img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80'
    },
    {
        id: 120,
        category: 'desserts',
        name: 'Wild Berry Pavlova Crisp',
        price: '₹485',
        rating: 4.7,
        badge: 'Meringue',
        desc: 'Crisp meringue shell with soft marshmallow interior, topped with whipped cream and fresh raspberries.',
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80'
    },
    {
        id: 121,
        category: 'desserts',
        name: 'Matcha Green Tea Sundae',
        price: '₹435',
        rating: 4.6,
        badge: 'Japanese',
        desc: 'Kyoto Uji matcha gelato served with red bean paste, chewy mochi balls, and matcha wafer.',
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80'
    },
    {
        id: 122,
        category: 'desserts',
        name: 'Opéra Cake Gateau Layered',
        price: '₹535',
        rating: 4.9,
        badge: 'French Gateau',
        desc: 'Almond sponge cake layers soaked in coffee syrup, layered with ganache and coffee buttercream.',
        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80'
    },
    {
        id: 123,
        category: 'desserts',
        name: 'Moong Dal Halwa Truffle Balls',
        price: '₹415',
        rating: 4.8,
        badge: 'Indian Sweet',
        desc: 'Traditional lentil halwa cooked in pure desi ghee, rolled into chocolate coated truffle bites.',
        img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80'
    },
    {
        id: 124,
        category: 'desserts',
        name: 'Grand Marnier Crêpes Suzette',
        price: '₹585',
        rating: 4.9,
        badge: 'Flambé',
        desc: 'Thin French crêpes flambéed tableside with orange juice, caramelized sugar, butter, and Grand Marnier liqueur.',
        img: 'https://images.unsplash.com/photo-1624371350106-2920e4ad608f?w=600&q=80'
    },
    {
        id: 125,
        category: 'desserts',
        name: 'Citron Lemon Meringue Pie',
        price: '₹455',
        rating: 4.7,
        badge: 'Tart',
        desc: 'Tangy Meyer lemon curd tart topped with fluffy torched Italian meringue peaks.',
        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80'
    },
    {
        id: 126,
        category: 'desserts',
        name: 'Kesar Pista Kulfi Falooda',
        price: '₹395',
        rating: 4.9,
        badge: 'Street Luxury',
        desc: 'Handcrafted saffron pistachio kulfi served over falooda noodles, basil seeds, and rose syrup.',
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80'
    },
    {
        id: 127,
        category: 'desserts',
        name: 'Hot Lava Chocolate Brownie',
        price: '₹475',
        rating: 4.8,
        badge: 'Popular',
        desc: 'Rich walnut fudge brownie served sizzling with vanilla ice cream and warm fudge drizzle.',
        img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80'
    },
    {
        id: 128,
        category: 'desserts',
        name: 'Affogato al Caffè Speciale',
        price: '₹385',
        rating: 4.8,
        badge: 'Coffee Dessert',
        desc: 'Scoop of fior di latte gelato drowned in a freshly pulled shot of double espresso and amaretto crumbs.',
        img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80'
    },
    {
        id: 129,
        category: 'desserts',
        name: 'Thai Coconut Mango Sticky Rice',
        price: '₹425',
        rating: 4.7,
        badge: 'Asian Sweet',
        desc: 'Warm sweet glutinous rice cooked in coconut milk, served with sweet sliced Alphonso mango.',
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80'
    },
    {
        id: 130,
        category: 'desserts',
        name: 'Gold Leaf Élan Grand Sundae',
        price: '₹695',
        rating: 5.0,
        badge: 'Grand Final',
        desc: 'Trio of dark chocolate, hazelnut, and vanilla gelatos layered with brownie bites, berries, and 24K gold leaf.',
        img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80'
    },

    /* ==========================================
       5. DRINKS & BEVERAGES (25 Items)
       ========================================== */
    {
        id: 131,
        category: 'drinks',
        name: 'Élan Passionfruit Gold Mocktail',
        price: '₹395',
        rating: 4.9,
        badge: 'Signature Drink',
        desc: 'Passion fruit nectar, elderflower syrup, lime juice, sparkling soda, fresh mint leaves, and rose syrup rim.',
        img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80'
    },
    {
        id: 132,
        category: 'drinks',
        name: 'Royal Saffron Cardamom Lassi',
        price: '₹295',
        rating: 4.9,
        badge: 'Indian Beverage',
        desc: 'Thick churned yoghurt drink blended with Kashmiri saffron, green cardamom, rose water, and slivered pistachios.',
        img: 'https://images.unsplash.com/photo-1571006682858-a45722271578?w=600&q=80'
    },
    {
        id: 133,
        category: 'drinks',
        name: 'Smoked Rosemary Old Fashioned',
        price: '₹595',
        rating: 5.0,
        badge: 'Craft Cocktail',
        desc: 'Aged bourbon style zero-proof elixir infused with Angostura bitters, orange peel, and smoked rosemary.',
        img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80'
    },
    {
        id: 134,
        category: 'drinks',
        name: 'Botanical Cucumber Mint Cooler',
        price: '₹345',
        rating: 4.8,
        badge: 'Refreshing',
        desc: 'Muddled English cucumber, garden mint, lime, organic agave, and sparkling tonic water.',
        img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80'
    },
    {
        id: 135,
        category: 'drinks',
        name: 'Artisanal Cold Brew Espresso Tonic',
        price: '₹325',
        rating: 4.8,
        badge: 'Specialty Coffee',
        desc: 'Single-origin 18-hour cold brew coffee poured over premium Fever-Tree Mediterranean tonic water with orange twist.',
        img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80'
    },
    {
        id: 136,
        category: 'drinks',
        name: 'French Sparkling Elderflower Fizz',
        price: '₹425',
        rating: 4.9,
        badge: 'Sparkling',
        desc: 'Wild French elderflower cordial shaken with white peach, lemon, and topped with non-alcoholic sparkling grape juice.',
        img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80'
    },
    {
        id: 137,
        category: 'drinks',
        name: 'Kashmiri Saffron Kahwa Infusion',
        price: '₹285',
        rating: 4.9,
        badge: 'Artisan Tea',
        desc: 'Traditional green tea brewed with saffron strands, cinnamon bark, cardamom pods, crushed almonds, and honey.',
        img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80'
    },
    {
        id: 138,
        category: 'drinks',
        name: 'Velvet Belgian Iced Mocha',
        price: '₹365',
        rating: 4.8,
        badge: 'Coffee',
        desc: 'Double shot espresso blended with melted Belgian dark chocolate, whole milk, crushed ice, and whipped cream.',
        img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80'
    },
    {
        id: 139,
        category: 'drinks',
        name: 'Rose Lychee Sparkling Spritzer',
        price: '₹375',
        rating: 4.8,
        badge: 'Floral Mocktail',
        desc: 'Sweet lychee juice infused with organic Bulgarian rose extract and chilled sparkling club soda.',
        img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80'
    },
    {
        id: 140,
        category: 'drinks',
        name: 'Hibiscus Wild Berry Sangria',
        price: '₹395',
        rating: 4.9,
        badge: 'Zero-Proof',
        desc: 'Cold brewed hibiscus tea steeped with sliced apples, oranges, berries, cinnamon, and sparkling grape juice.',
        img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80'
    },
    {
        id: 141,
        category: 'drinks',
        name: 'Single Origin V60 Pour-Over',
        price: '₹295',
        rating: 4.9,
        badge: 'Coffee',
        desc: 'Ethically sourced 100% Arabica beans from Chikmagalur, hand poured using V60 dripper.',
        img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80'
    },
    {
        id: 142,
        category: 'drinks',
        name: 'Mango Chilli Margarita Twist',
        price: '₹445',
        rating: 4.8,
        badge: 'Spicy Cocktail',
        desc: 'Fresh Alphonso mango purée, agave, fresh lime juice, habanero chilli tincture, and black salt rim.',
        img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80'
    },
    {
        id: 143,
        category: 'drinks',
        name: 'Spiced Kullad Masala Chai',
        price: '₹265',
        rating: 4.9,
        badge: 'Indian Classic',
        desc: 'Traditional Assam black tea boiled with ginger, lemongrass, cardamom, and clove, served in earthenware cup.',
        img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80'
    },
    {
        id: 144,
        category: 'drinks',
        name: 'Blue Lagoon Citrus Freeze',
        price: '₹355',
        rating: 4.7,
        badge: 'Cooler',
        desc: 'Blue Curacao non-alcoholic syrup blended with fresh lemonade, crushed ice, and maraschino cherry.',
        img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80'
    },
    {
        id: 145,
        category: 'drinks',
        name: 'Virgin Tropical Pina Colada',
        price: '₹385',
        rating: 4.8,
        badge: 'Tropical',
        desc: 'Fresh pineapple juice churned with coconut cream, crushed ice, and toasted coconut flakes.',
        img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80'
    },
    {
        id: 146,
        category: 'drinks',
        name: 'Matcha Cold Foam Cloud Latte',
        price: '₹345',
        rating: 4.8,
        badge: 'Japanese Tea',
        desc: 'Japanese ceremonial Uji matcha layered over oat milk and topped with sweet cream cold foam.',
        img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80'
    },
    {
        id: 147,
        category: 'drinks',
        name: 'Fresh Watermelon Basil Blast',
        price: '₹315',
        rating: 4.8,
        badge: 'Fresh Juice',
        desc: 'Freshly pressed seedless watermelon juice muddled with sweet Thai basil leaves and pink Himalayan salt.',
        img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80'
    },
    {
        id: 148,
        category: 'drinks',
        name: 'Sparkling Lavender Lemonade',
        price: '₹335',
        rating: 4.7,
        badge: 'Floral',
        desc: 'French culinary lavender infused simple syrup with fresh squeezed lemon juice and sparkling water.',
        img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80'
    },
    {
        id: 149,
        category: 'drinks',
        name: 'Gold Dust Flaked Cappuccino',
        price: '₹375',
        rating: 4.9,
        badge: 'Luxury Coffee',
        desc: 'Double shot Italian espresso with steamed milk foam art, dusted with cocoa and 24K edible gold flakes.',
        img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80'
    },
    {
        id: 150,
        category: 'drinks',
        name: 'Spiced Ginger Peach Iced Tea',
        price: '₹285',
        rating: 4.8,
        badge: 'Iced Tea',
        desc: 'Darjeeling black tea steeped with ripe peach purée, fresh ginger juice, and mint leaves over ice.',
        img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80'
    },
    {
        id: 151,
        category: 'drinks',
        name: 'Pomegranate Lime Mojito Zero',
        price: '₹365',
        rating: 4.9,
        badge: 'Mojito',
        desc: 'Fresh pomegranate arils muddled with lime wedges, mint leaves, cane sugar, and club soda.',
        img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80'
    },
    {
        id: 152,
        category: 'drinks',
        name: 'Belgian Hot Chocolate Pot',
        price: '₹395',
        rating: 5.0,
        badge: 'Warm Dessert Drink',
        desc: 'Thick melted 70% Callebaut dark chocolate simmered with whole milk, topped with toasted marshmallows.',
        img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80'
    },
    {
        id: 153,
        category: 'drinks',
        name: 'Green Detox Fusion Juice',
        price: '₹325',
        rating: 4.7,
        badge: 'Healthy',
        desc: 'Cold-pressed green apple, celery, spinach, cucumber, ginger, and lemon juice with chia seeds.',
        img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80'
    },
    {
        id: 154,
        category: 'drinks',
        name: 'Frozen Salted Caramel Macchiato',
        price: '₹355',
        rating: 4.8,
        badge: 'Frozen Coffee',
        desc: 'Espresso, milk, ice, and buttery caramel syrup blended smooth, topped with sea salt caramel drizzle.',
        img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80'
    },
    {
        id: 155,
        category: 'drinks',
        name: 'Sparkling San Pellegrino (750ml)',
        price: '₹245',
        rating: 4.9,
        badge: 'Mineral Water',
        desc: 'Chilled natural sparkling mineral water bottled at the source in Bergamo, Italy.',
        img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80'
    }
];

/* ==========================================
   GALLERY DATA (30 High-Res Images)
   ========================================== */
const GALLERY_DATA = [
    { title: 'Main Fine Dining Hall', tag: 'Interior', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=90', tall: false, wide: false },
    { title: 'Executive Chef Plating', tag: 'Chef Action', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=90', tall: true, wide: false },
    { title: 'Black Truffle Bruschetta', tag: 'Starters', img: 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=900&q=90', tall: false, wide: false },
    { title: 'Royal Wine Cellar Vault', tag: 'Ambience', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=90', tall: false, wide: true },
    { title: 'Candlelight Dinner Table', tag: 'Dining Experience', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=90', tall: false, wide: false },
    { title: 'Pan-Seared Salmon Plate', tag: 'Continental Mains', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=90', tall: false, wide: false },
    { title: 'Live Charcoal Tandoor Grill', tag: 'Kitchen Action', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=90', tall: true, wide: false },
    { title: 'Botanical Craft Cocktails', tag: 'Bar', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=90', tall: false, wide: false },
    { title: 'Valrhona Chocolate Molten Lava', tag: 'Desserts', img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=900&q=90', tall: false, wide: false },
    { title: 'Romantic Sunset Terrace', tag: 'Outdoor Dining', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=90', tall: false, wide: true },
    { title: 'Awadhi Mutton Dum Biryani', tag: 'Indian Mains', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=90', tall: false, wide: false },
    { title: 'Artisanal Baked Sourdough', tag: 'Bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=90', tall: false, wide: false },
    { title: 'VIP Private Dining Suite', tag: 'VIP Suite', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=90', tall: true, wide: false },
    { title: 'Authentic Wood Fired Pizza Oven', tag: 'Kitchen', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=90', tall: false, wide: false },
    { title: 'Organic Farm Harvest Salad', tag: 'Healthy', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=90', tall: false, wide: false },
    { title: 'Pastry Chef Finishing Touch', tag: 'Chef Action', img: 'https://images.unsplash.com/photo-1606631325218-17fb98d19202?w=900&q=90', tall: false, wide: false },
    { title: 'Specialty Coffee Barista Art', tag: 'Coffee Bar', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&q=90', tall: false, wide: false },
    { title: 'King Scallops w/ Beurre Blanc', tag: 'Starters', img: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=900&q=90', tall: false, wide: false },
    { title: 'Crystal Stemware & Cutlery', tag: 'Table Setup', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=90', tall: true, wide: false },
    { title: 'Paneer Butter Masala Velvet', tag: 'Indian Mains', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&q=90', tall: false, wide: false },
    { title: 'Open Kitchen Culinary View', tag: 'Ambience', img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=900&q=90', tall: false, wide: true },
    { title: 'Fresh Wild Atlantic Seafood', tag: 'Fresh Catch', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&q=90', tall: false, wide: false },
    { title: 'Evening Golden Façade', tag: 'Architecture', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=90', tall: false, wide: false },
    { title: 'Flame Sear Ribeye Steak', tag: 'Grill', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=90', tall: true, wide: false },
    { title: 'Classic Venetian Tiramisu', tag: 'Desserts', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=90', tall: false, wide: false },
    { title: 'Master Mixologist Pouring', tag: 'Bar Show', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=90', tall: false, wide: false },
    { title: 'Maison Élan Award Culinary Team', tag: 'Team', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=90', tall: false, wide: true },
    { title: 'Dessert Trolley Presentation', tag: 'Sweet Cart', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=900&q=90', tall: false, wide: false },
    { title: 'Courtyard Garden Lounge', tag: 'Outdoor Lounge', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=90', tall: false, wide: false },
    { title: 'Royal Banquet Table Arrangement', tag: 'Banquets', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=90', tall: false, wide: false }
];
