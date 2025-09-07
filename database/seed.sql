-- Seed data for restaurants and menu items

-- Insert restaurants
INSERT INTO restaurants (name, category, image_url, logo_url, rating, discount, address, phone, hours, delivery_radius, delivery_time, features) VALUES
('Pune Thali House', 'Veg Thali', 'https://placehold.co/1200x800?text=Maharashtrian+Thali', 'https://placehold.co/100x100?text=Logo', 4.5, '20% OFF', '123 MG Road, Pune, Maharashtra 411001', '+91 98765 43210', '10:00 AM - 10:00 PM', '5 km', '30-45 min', ARRAY['Free Delivery', 'Cash on Delivery', 'Online Payment']),
('Mumbai Spice Kitchen', 'Non-Veg Thali', 'https://placehold.co/1200x800?text=Non-Veg+Thali', 'https://placehold.co/100x100?text=Logo', 4.8, '15% OFF', '456 Linking Road, Bandra West, Mumbai 400050', '+91 98765 43211', '11:00 AM - 11:00 PM', '8 km', '35-50 min', ARRAY['Free Delivery', 'Online Payment', 'Express Delivery']),
('Kolhapur Royal Kitchen', 'Special Thali', 'https://placehold.co/1200x800?text=Special+Thali', 'https://placehold.co/100x100?text=Logo', 4.9, '25% OFF', '789 Mahadwar Road, Kolhapur, Maharashtra 416001', '+91 98765 43212', '9:00 AM - 9:00 PM', '6 km', '25-40 min', ARRAY['Free Delivery', 'Cash on Delivery', 'Online Payment', 'Premium Service']);

-- Insert menu items for Pune Thali House
INSERT INTO menu_items (restaurant_id, name, price, rating, content, has_dessert)
SELECT 
    r.id,
    m.name,
    m.price,
    m.rating,
    m.content,
    m.has_dessert
FROM restaurants r
CROSS JOIN (VALUES
    ('Special Veg Thali', 250, 4.7, '3 Chapatis, 2 Bhaji, Rice, Dal, Dessert (Gulab Jamun)', true),
    ('Regular Veg Thali', 200, 4.5, '3 Chapatis, 2 Bhaji, Rice, Dal', false),
    ('Chapati Bhaji', 150, 4.3, '4 Chapatis, Bhaji', false),
    ('Dal Rice', 100, 4.2, 'Dal, Rice', false),
    ('Special Non-Veg Thali', 300, 4.8, '3 Chapatis, Chicken Curry, Rice, Dal, Dessert (Shrikhand)', true)
) AS m(name, price, rating, content, has_dessert)
WHERE r.name = 'Pune Thali House';

-- Insert menu items for Mumbai Spice Kitchen
INSERT INTO menu_items (restaurant_id, name, price, rating, content, has_dessert)
SELECT 
    r.id,
    m.name,
    m.price,
    m.rating,
    m.content,
    m.has_dessert
FROM restaurants r
CROSS JOIN (VALUES
    ('Special Non-Veg Thali', 300, 4.8, '3 Chapatis, Chicken Curry, Rice, Dal, Dessert (Shrikhand)', true),
    ('Regular Non-Veg Thali', 250, 4.6, '3 Chapatis, Chicken Curry, Rice, Dal', false),
    ('Mutton Thali', 350, 4.9, '3 Chapatis, Mutton Curry, Rice, Dal, Dessert (Gulab Jamun)', true)
) AS m(name, price, rating, content, has_dessert)
WHERE r.name = 'Mumbai Spice Kitchen';

-- Insert menu items for Kolhapur Royal Kitchen
INSERT INTO menu_items (restaurant_id, name, price, rating, content, has_dessert)
SELECT 
    r.id,
    m.name,
    m.price,
    m.rating,
    m.content,
    m.has_dessert
FROM restaurants r
CROSS JOIN (VALUES
    ('Royal Special Thali', 400, 4.9, '4 Chapatis, 3 Bhaji, Rice, Dal, Gulab Jamun & Shrikhand', true),
    ('Kolhapuri Special', 350, 4.8, '3 Chapatis, Kolhapuri Chicken, Rice, Dal, Dessert (Shrikhand)', true),
    ('Maharashtrian Delight', 280, 4.7, '3 Chapatis, 2 Bhaji, Rice, Dal, Dessert (Gulab Jamun)', true)
) AS m(name, price, rating, content, has_dessert)
WHERE r.name = 'Kolhapur Royal Kitchen';

-- Insert restaurant extras
INSERT INTO restaurant_extras (restaurant_id, name, price)
SELECT 
    r.id,
    e.name,
    e.price
FROM restaurants r
CROSS JOIN (VALUES
    ('Extra Chapati', 20),
    ('Extra Sweet', 30),
    ('Extra Salad', 15)
) AS e(name, price)
WHERE r.name = 'Pune Thali House';

INSERT INTO restaurant_extras (restaurant_id, name, price)
SELECT 
    r.id,
    e.name,
    e.price
FROM restaurants r
CROSS JOIN (VALUES
    ('Extra Chapati', 20),
    ('Extra Chicken', 50),
    ('Extra Sweet', 30)
) AS e(name, price)
WHERE r.name = 'Mumbai Spice Kitchen';

INSERT INTO restaurant_extras (restaurant_id, name, price)
SELECT 
    r.id,
    e.name,
    e.price
FROM restaurants r
CROSS JOIN (VALUES
    ('Extra Chapati', 20),
    ('Extra Sweet', 30),
    ('Extra Salad', 15),
    ('Extra Dessert', 40)
) AS e(name, price)
WHERE r.name = 'Kolhapur Royal Kitchen';
