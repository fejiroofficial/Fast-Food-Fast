CREATE TABLE IF NOT EXISTS users (
   id  SERIAL PRIMARY KEY,
   firstname  VARCHAR(255) NOT NULL,
   lastname  VARCHAR(255) NOT NULL,
   email  VARCHAR(255) NOT NULL UNIQUE,
   telephone  VARCHAR(255) UNIQUE,
   password  VARCHAR(255) NOT NULL,
   admin_user  INT NOT NULL,
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS food_menu (
   id  SERIAL PRIMARY KEY,
   item_name  VARCHAR(255) NOT NULL UNIQUE,
   price  decimal(12,2) NOT NULL,
   food_image  VARCHAR(225) NOT NULL,
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart (
   id  SERIAL PRIMARY KEY,  
   user_id  INT NOT NULL,
   food_id  INT NOT NULL,
   unit_price  DECIMAL(12,2) NOT NULL,
   quantity  INT NOT NULL,
   total INT NOT NULL,
     --Relationship-- 
  FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS placed_order (
   id  SERIAL PRIMARY KEY,
   user_id  INT NOT NULL,
   delivery_address  VARCHAR(255) NOT NULL,
   telephone  VARCHAR(255) NOT NULL,
   total_price DECIMAL(12,2) NOT NULL,
   order_time  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    --Relationship-- 
  FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS food_ordered (
   id  SERIAL PRIMARY KEY,
   user_id  INT NOT NULL,
   placed_order_id  INT NOT NULL,
   food_item  VARCHAR(255) NOT NULL,
   unit_price  DECIMAL(12,2) NOT NULL,
   quantity  INT NOT NULL,
   total  DECIMAL(12,2) NOT NULL,
   order_time  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      --Relationship-- 
  FOREIGN KEY( placed_order_id ) REFERENCES placed_order( id ) ON DELETE CASCADE,
  FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS order_status (
   id  SERIAL PRIMARY KEY,
   placed_order_id  INT NOT NULL,
   status_name  VARCHAR(255),
   time_stamp  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        --Relationship-- 
  FOREIGN KEY( placed_order_id ) REFERENCES placed_order( id ) ON DELETE CASCADE
);