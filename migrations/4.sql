
-- Clear any existing Kundapura businesses to avoid duplicates
DELETE FROM businesses WHERE city = 'Kundapura';

-- Insert the 10 businesses with proper details and images
INSERT INTO businesses (name, category, city, area, address, phone, image_url, short_desc, owner, approved, created_at) VALUES 
-- EAT Category (4 businesses)
('Harsha Refreshment Veg', 'Eat', 'Kundapura', 'Shastri Circle', 'Shastri Circle, Kundapura', '+91 94481 29161', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uF8R-iUt5kJk2t6lJbCmZRjUJtkA9cXV5w&s', 'Classic vegetarian restaurant at Shastri Circle, famous for quick service and tasty South Indian meals.', 'admin', true, CURRENT_TIMESTAMP),

('Lashika Veg (UVA Manish)', 'Eat', 'Kundapura', 'Opp Gandhi Maidan', 'Opp Gandhi Maidan, Kundapura', '+91 88670 42555', 'https://content3.jdmagicbox.com/v2/comp/udupi/w2/0820px820.x820.240331182814.n3w2/catalogue/lashika-pure-vegetarian-restaurant-vaderhobli-udupi-restaurants-c0tfba0iae.jpg', 'Elegant vegetarian restaurant opposite Gandhi Maidan, serving both South and North Indian cuisine.', 'admin', true, CURRENT_TIMESTAMP),

('Eshanya Street Café', 'Eat', 'Kundapura', 'Rooftop Café', 'Rooftop café, Kundapura', '+91 81475 78058', 'https://i.ytimg.com/vi/iw1ja99LFDE/maxresdefault.jpg', 'Trendy rooftop café serving vegetarian street food and desserts with a lively ambience.', 'admin', true, CURRENT_TIMESTAMP),

('Hotel Dwaraka', 'Eat', 'Kundapura', 'Near Shastri Circle', 'Near Shastri Circle, Kundapura', '+91 94482 13085', 'https://b.zmtcdn.com/data/pictures/4/20419594/dcdd31366daf22ab4fbec89732b7701a.jpg', 'Family-friendly veg restaurant near Shastri Circle, known for masala dosa and coffee.', 'admin', true, CURRENT_TIMESTAMP),

-- HEALTH Category (2 businesses)
('Radha Medicals – Kundapura', 'Health', 'Kundapura', 'Near Kundapura Temple', 'Near Kundapura Temple, Kundapura', '+91 92437 57507', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4notUi_-pQU2enIj1hCUBIOcoM7m3rHGtTQ2QhfKvPR6M2OUS1UK9J74PukA-y2lYYjjiJlDXfOTiRnYbDg-QEScWwaOm6yBvbNbBooEvL72uB11T-NKVHAb0899pESR558MR5M=s1360-w1360-h1020-rw', 'Trusted pharmacy near Kundapura Temple, open till 10 pm with a wide range of medicines.', 'admin', true, CURRENT_TIMESTAMP),

('Vasudeva Hande Sridevi Ambulance', 'Health', 'Kundapura', '', 'Kundapura, Karnataka', '+91 98440 51361', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Uiuz5E6SZAARu3HhVXNCiVdn4bnU2vn66A&s', '24x7 ambulance service offering BLS, ALS, critical care, boat & air ambulance facilities.', 'admin', true, CURRENT_TIMESTAMP),

-- SHOP Category (3 businesses)
('Satwadi Sundar Shetty Departmental Store', 'Shop', 'Kundapura', 'Satwadi', 'Satwadi, Kundapura', '+91 94809 87654', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq8EHlZ-58WwFHgTTjEGORNGJXwA_Sut4YQj1iQjdDHe-gd2Un3l6TXrzwbQQy55a7YYSJF558jVoFkGxdpTUfB_VBg_BHkMsAkPUC3dQ0aCK6VOByky-YBEjS7iPKmAmHVHUE=s1360-w1360-h1020-rw', 'Well-stocked departmental store in Kundapura for groceries and daily essentials.', 'admin', true, CURRENT_TIMESTAMP),

('Ganesh Stores', 'Shop', 'Kundapura', 'Bazaar', 'Bazaar Road, Kundapura', '+91 98455 46712', 'https://content.jdmagicbox.com/comp/udupi/d4/0820px820.x820.210129110220.q2d4/catalogue/ganesh-bazaar-kundapura-udupi-supermarkets-qi2odb7z6x.jpg', 'Popular general store in Kundapura offering groceries and household products.', 'admin', true, CURRENT_TIMESTAMP),

('Mahamaya General Stores (Koteshwara)', 'Shop', 'Kundapura', 'Koteshwara', 'Koteshwara, Kundapura', '', 'https://lh3.googleusercontent.com/p/AF1QipNPEMswL0IKNhwZCwc3QKK2H6gDMuEr6kalJfF1=s1360-w1360-h1020-rw', 'Local general store in Koteshwara catering to daily household needs.', 'admin', true, CURRENT_TIMESTAMP),

-- PET CARE Category (1 business)
('Animal Planet – Koteshwara', 'Pet Care', 'Kundapura', 'Koteshwara', 'Koteshwara, Kundapura', '+91 98456 06195', 'https://static.where-e.com/India/Karnataka_State/Animal-Planet_37fb85f058fba4417e022f3fcb63a626.jpg', 'Pet care and supplies store offering food, accessories, and grooming products.', 'admin', true, CURRENT_TIMESTAMP);
