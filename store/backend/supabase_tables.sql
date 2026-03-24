-- =====================================================
-- Run this SQL in your Supabase SQL Editor (one time)
-- Dashboard → SQL Editor → New Query → paste & Run
-- =====================================================

-- 1. Products table
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(10,2) not null check (price > 0),
  image_url   text,
  stock       integer not null default 0 check (stock >= 0),
  created_at  timestamptz default now()
);

-- 2. Orders table
create table if not exists orders (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null,                -- references auth.users(id)
  status      text not null default 'pending',
  total       numeric(10,2) not null default 0,
  created_at  timestamptz default now()
);

-- 3. Order items (line-items inside an order)
create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  product_id  uuid not null references products(id),
  quantity    integer not null default 1 check (quantity >= 1),
  unit_price  numeric(10,2) not null
);

-- 4. Enable Row Level Security (recommended)
alter table products    enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;

-- 5. Basic RLS policies (allow everything for anon key — tighten later)
create policy "Public read products"  on products  for select using (true);
create policy "Public insert products" on products for insert with check (true);
create policy "Public update products" on products for update using (true);
create policy "Public delete products" on products for delete using (true);

create policy "Users manage own orders" on orders
  for all using (auth.uid() = user_id);

create policy "Users manage own order items" on order_items
  for all using (
    order_id in (select id from orders where user_id = auth.uid())
  );
