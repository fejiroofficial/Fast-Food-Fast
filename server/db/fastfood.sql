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

CREATE TABLE IF NOT EXISTS menu (
   id  SERIAL PRIMARY KEY,
   item_name  VARCHAR(255) NOT NULL UNIQUE,
   price  decimal(12,2) NOT NULL,
   food_url  VARCHAR(225) NOT NULL,
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart (
   id  SERIAL PRIMARY KEY,  
   user_id  INT NOT NULL,
   food_id INT NOT NULL,
   quantity  INT NOT NULL,
   total INT NOT NULL,
     --Relationship-- 
  FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE,
  FOREIGN KEY(food_id) REFERENCES menu(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
   id  SERIAL PRIMARY KEY,
   user_id  INT NOT NULL,
   delivery_address  VARCHAR(255) NOT NULL,
   telephone  VARCHAR(255) NOT NULL,
   total_price DECIMAL(12,2) NOT NULL,
   order_status VARCHAR(255) NOT NULL,
   order_time  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    --Relationship-- 
  FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS food_ordered (
   id  SERIAL PRIMARY KEY,
   user_id  INT NOT NULL,
   orders_id  INT NOT NULL,
   food_id INT NOT NULL,
   quantity  INT NOT NULL,
   total  DECIMAL(12,2) NOT NULL,
      --Relationship-- 
  FOREIGN KEY( orders_id ) REFERENCES orders( id ) ON DELETE CASCADE,
  FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE,
  FOREIGN KEY( food_id ) REFERENCES menu( id ) ON DELETE CASCADE
  );
