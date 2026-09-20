export interface DataDictionaryField {
  name: string;
  type: string;
  key?: 'PK' | 'FK' | 'UK';
  nullable?: boolean;
  defaultValue?: string;
  description: string;
}

export interface DataDictionaryTable {
  name: string;
  purpose: string;
  fields: DataDictionaryField[];
}

export interface ErdRelationship {
  from: string;
  to: string;
  type: string;
  cardinality: string;
  via: string;
  onDelete: string;
  description: string;
}

export const erdMeta = {
  system: 'Amora Florals E-Commerce System',
  subtitle: 'Logical Entity Relationship Diagram (Crow’s Foot notation)',
  source: 'Laravel migrations in https://github.com/shaeijmnz/amora_web',
  engine: 'MySQL / MariaDB (utf8mb4), also runnable on SQLite',
};

export const statusDomains = [
  {
    name: 'user.role',
    values: ['customer', 'admin'],
  },
  {
    name: 'categories.group',
    values: ['flower', 'material', 'addon'],
  },
  {
    name: 'inventory_items.status',
    values: ['in_stock', 'low_stock', 'out_of_stock', 'reserved', 'damaged', 'spoiled'],
  },
  {
    name: 'orders.order_type',
    values: ['standard', 'custom'],
  },
  {
    name: 'orders.status',
    values: [
      'pending',
      'confirmed',
      'being_prepared',
      'ready_for_delivery',
      'dispatched',
      'delivered',
      'completed',
      'cancelled',
      'refunded',
    ],
  },
  {
    name: 'orders.payment_status',
    values: ['unpaid', 'partially_paid', 'paid', 'refunded'],
  },
  {
    name: 'deliveries.status',
    values: [
      'unscheduled',
      'scheduled',
      'assigned',
      'preparing_for_dispatch',
      'dispatched',
      'out_for_delivery',
      'delivered',
      'delivery_failed',
      'rescheduled',
    ],
  },
];

export const relationships: ErdRelationship[] = [
  {
    from: 'USERS',
    to: 'ORDERS',
    type: 'One-to-Many',
    cardinality: '1 : N',
    via: 'orders.customer_id → users.id',
    onDelete: 'CASCADE',
    description: 'A customer (or admin-placed order owner) can place many orders. Every order belongs to exactly one user.',
  },
  {
    from: 'ORDERS',
    to: 'ORDER_ITEMS',
    type: 'One-to-Many',
    cardinality: '1 : N',
    via: 'order_items.order_id → orders.id',
    onDelete: 'CASCADE',
    description: 'An order contains one or more line items. Deleting an order removes its items.',
  },
  {
    from: 'ORDERS',
    to: 'DELIVERIES',
    type: 'One-to-One',
    cardinality: '1 : 0..1',
    via: 'deliveries.order_id → orders.id (UNIQUE)',
    onDelete: 'CASCADE',
    description: 'Each order may have at most one delivery record. Delivery is created when the order is scheduled, so the relationship is optional.',
  },
  {
    from: 'PRODUCTS',
    to: 'PRODUCT_SIZES',
    type: 'One-to-Many',
    cardinality: '1 : N',
    via: 'product_sizes.product_id → products.id',
    onDelete: 'CASCADE',
    description: 'An arrangement can be sold in multiple sizes (Small / Medium / Large), each with its own price.',
  },
  {
    from: 'PRODUCTS',
    to: 'ORDER_ITEMS',
    type: 'One-to-Many',
    cardinality: '1 : 0..N',
    via: 'order_items.product_id → products.id',
    onDelete: 'SET NULL',
    description: 'A catalog product can appear on many order lines. product_id is nullable so custom arrangements can exist without a catalog product.',
  },
  {
    from: 'PRODUCT_SIZES',
    to: 'ORDER_ITEMS',
    type: 'One-to-Many',
    cardinality: '1 : 0..N',
    via: 'order_items.size_id → product_sizes.id',
    onDelete: 'SET NULL',
    description: 'A chosen size snapshots the unit price onto the line item. Nullable for custom items that skip size variants.',
  },
  {
    from: 'CATEGORIES',
    to: 'INVENTORY_ITEMS',
    type: 'One-to-Many',
    cardinality: '1 : 0..N',
    via: 'inventory_items.category_id → categories.id',
    onDelete: 'SET NULL',
    description: 'Inventory rows (flowers, materials, add-ons) optionally belong to a category group.',
  },
  {
    from: 'PRODUCTS',
    to: 'INVENTORY_ITEMS',
    type: 'One-to-Many',
    cardinality: '1 : 0..N',
    via: 'inventory_items.product_id → products.id',
    onDelete: 'SET NULL',
    description: 'Optional link used when a sellable product is also tracked as a stocked item (for example single-stem SKUs).',
  },
];

export const dataDictionary: DataDictionaryTable[] = [
  {
    name: 'users',
    purpose: 'Accounts for mobile customers and admin-dashboard staff. Role-based access lives on this table.',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'name', type: 'VARCHAR(255)', description: 'Display name of the account holder.' },
      { name: 'email', type: 'VARCHAR(255)', key: 'UK', description: 'Unique login identifier.' },
      { name: 'role', type: 'VARCHAR(255)', defaultValue: 'customer', description: 'customer or admin.' },
      { name: 'phone', type: 'VARCHAR(255)', nullable: true, description: 'Contact number used for delivery coordination.' },
      { name: 'email_verified_at', type: 'TIMESTAMP', nullable: true, description: 'Set after OTP / email verification.' },
      { name: 'password', type: 'VARCHAR(255)', description: 'Hashed password (Laravel hasher).' },
      { name: 'otp_code', type: 'VARCHAR(10)', nullable: true, description: 'One-time passcode for email verification.' },
      { name: 'otp_expires_at', type: 'TIMESTAMP', nullable: true, description: 'Expiry of the current OTP.' },
      { name: 'remember_token', type: 'VARCHAR(100)', nullable: true, description: 'Laravel remember-me token.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Row creation timestamp.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Row update timestamp.' },
    ],
  },
  {
    name: 'categories',
    purpose: 'Lookup list that groups inventory items into flower, material, or add-on.',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'name', type: 'VARCHAR(255)', description: 'Category label, e.g. Fresh Flowers.' },
      { name: 'group', type: 'VARCHAR(255)', defaultValue: 'flower', description: 'flower | material | addon.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Row creation timestamp.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Row update timestamp.' },
    ],
  },
  {
    name: 'products',
    purpose: 'Sellable floral arrangements shown in the shop catalog.',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'name', type: 'VARCHAR(255)', description: 'Arrangement name.' },
      { name: 'category', type: 'VARCHAR(255)', nullable: true, description: 'Free-text shop category (not an FK to categories).' },
      { name: 'description', type: 'TEXT', nullable: true, description: 'Marketing / product description.' },
      { name: 'note', type: 'TEXT', nullable: true, description: 'Internal or customer-facing product note.' },
      { name: 'primary_image_url', type: 'VARCHAR(255)', nullable: true, description: 'Main catalog image.' },
      { name: 'gallery_image_urls', type: 'JSON', nullable: true, description: 'Additional gallery images.' },
      { name: 'images', type: 'JSON', nullable: true, description: 'Alternate image payload used by the admin UI.' },
      { name: 'preparation_time_minutes', type: 'INT UNSIGNED', defaultValue: '60', description: 'Estimated prep time before dispatch.' },
      { name: 'is_available', type: 'BOOLEAN', defaultValue: 'true', description: 'Whether the product can be ordered.' },
      { name: 'is_featured', type: 'BOOLEAN', defaultValue: 'false', description: 'Highlighted on the storefront.' },
      { name: 'is_stem', type: 'BOOLEAN', defaultValue: 'false', description: 'Marks single-stem items vs bouquets.' },
      { name: 'is_customisable', type: 'BOOLEAN', defaultValue: 'false', description: 'Customer may pick colors / extras.' },
      { name: 'customisation_items', type: 'JSON', nullable: true, description: 'Allowed customisation options.' },
      { name: 'rating', type: 'DECIMAL(3,1)', defaultValue: '4.5', description: 'Display rating.' },
      { name: 'reviews_count', type: 'INT UNSIGNED', defaultValue: '0', description: 'Number of reviews shown on the card.' },
      { name: 'archived_at', type: 'TIMESTAMP', nullable: true, description: 'Soft-delete timestamp.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Row creation timestamp.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Row update timestamp.' },
    ],
  },
  {
    name: 'product_sizes',
    purpose: 'Size/price variants for a product (Small, Medium, Large).',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'product_id', type: 'BIGINT UNSIGNED', key: 'FK', description: 'Parent product. CASCADE on delete.' },
      { name: 'label', type: 'VARCHAR(255)', description: 'Size label.' },
      { name: 'price', type: 'DECIMAL(10,2)', description: 'Unit price for this size.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Row creation timestamp.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Row update timestamp.' },
    ],
  },
  {
    name: 'inventory_items',
    purpose: 'Physical stock of flowers, wrapping materials, and add-ons.',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'product_id', type: 'BIGINT UNSIGNED', key: 'FK', nullable: true, description: 'Optional link to a catalog product. SET NULL on delete.' },
      { name: 'category_id', type: 'BIGINT UNSIGNED', key: 'FK', nullable: true, description: 'Inventory category. SET NULL on delete.' },
      { name: 'name', type: 'VARCHAR(255)', description: 'Stock item name.' },
      { name: 'image_url', type: 'VARCHAR(255)', nullable: true, description: 'Photo of the stock item.' },
      { name: 'unit', type: 'VARCHAR(255)', defaultValue: 'pcs', description: 'Unit of measure (pcs, stem, bunch, roll).' },
      { name: 'quantity_on_hand', type: 'INT', defaultValue: '0', description: 'Current stock quantity.' },
      { name: 'min_stock_level', type: 'INT', defaultValue: '5', description: 'Reorder / low-stock threshold.' },
      { name: 'status', type: 'VARCHAR(255)', defaultValue: 'in_stock', description: 'Computed or manually overridden stock status.' },
      { name: 'expiration_date', type: 'DATE', nullable: true, description: 'Freshness date for perishable flowers.' },
      { name: 'archived_at', type: 'TIMESTAMP', nullable: true, description: 'Soft-delete timestamp.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Row creation timestamp.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Row update timestamp.' },
    ],
  },
  {
    name: 'orders',
    purpose: 'Customer checkout records, including gift recipient and PayMongo payment fields.',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'order_number', type: 'VARCHAR(255)', key: 'UK', description: 'Human-readable order code.' },
      { name: 'customer_id', type: 'BIGINT UNSIGNED', key: 'FK', description: 'Ordering user. CASCADE on delete.' },
      { name: 'order_type', type: 'VARCHAR(255)', defaultValue: 'standard', description: 'standard or custom.' },
      { name: 'status', type: 'VARCHAR(255)', defaultValue: 'pending', description: 'Fulfillment state machine.' },
      { name: 'payment_status', type: 'VARCHAR(255)', defaultValue: 'unpaid', description: 'Payment state machine.' },
      { name: 'payment_method', type: 'VARCHAR(255)', nullable: true, description: 'GCash, card, cash, etc.' },
      { name: 'paymongo_checkout_id', type: 'VARCHAR(255)', nullable: true, description: 'PayMongo Checkout Session id.' },
      { name: 'paymongo_payment_id', type: 'VARCHAR(255)', nullable: true, description: 'PayMongo payment id after success.' },
      { name: 'paid_at', type: 'TIMESTAMP', nullable: true, description: 'When payment was confirmed.' },
      { name: 'subtotal', type: 'DECIMAL(10,2)', defaultValue: '0', description: 'Sum of line items before fees.' },
      { name: 'delivery_fee', type: 'DECIMAL(10,2)', defaultValue: '0', description: 'Delivery charge.' },
      { name: 'discount', type: 'DECIMAL(10,2)', defaultValue: '0', description: 'Discount amount.' },
      { name: 'total', type: 'DECIMAL(10,2)', defaultValue: '0', description: 'Amount due / paid.' },
      { name: 'recipient_name', type: 'VARCHAR(255)', nullable: true, description: 'Gift recipient (may differ from customer).' },
      { name: 'recipient_contact', type: 'VARCHAR(255)', nullable: true, description: 'Recipient phone number.' },
      { name: 'delivery_address', type: 'TEXT', nullable: true, description: 'Free-text delivery address snapshot.' },
      { name: 'delivery_notes', type: 'TEXT', nullable: true, description: 'Special delivery instructions.' },
      { name: 'admin_notes', type: 'TEXT', nullable: true, description: 'Internal staff notes.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Order placed at.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Last update timestamp.' },
    ],
  },
  {
    name: 'order_items',
    purpose: 'Individual products (or custom lines) inside an order. Unit price is snapshotted at checkout.',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'order_id', type: 'BIGINT UNSIGNED', key: 'FK', description: 'Parent order. CASCADE on delete.' },
      { name: 'product_id', type: 'BIGINT UNSIGNED', key: 'FK', nullable: true, description: 'Catalog product. SET NULL on delete.' },
      { name: 'size_id', type: 'BIGINT UNSIGNED', key: 'FK', nullable: true, description: 'Chosen size variant. SET NULL on delete.' },
      { name: 'quantity', type: 'INT UNSIGNED', defaultValue: '1', description: 'Quantity ordered.' },
      { name: 'unit_price', type: 'DECIMAL(10,2)', description: 'Price per unit at time of order.' },
      { name: 'flower_color', type: 'VARCHAR(255)', nullable: true, description: 'Requested flower color.' },
      { name: 'personalized_message', type: 'TEXT', nullable: true, description: 'Card message for the recipient.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Row creation timestamp.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Row update timestamp.' },
    ],
  },
  {
    name: 'deliveries',
    purpose: 'Delivery leg of an order, including rider assignment and proof of delivery.',
    fields: [
      { name: 'id', type: 'BIGINT UNSIGNED', key: 'PK', description: 'Surrogate primary key.' },
      { name: 'order_id', type: 'BIGINT UNSIGNED', key: 'FK', description: 'Unique FK — one delivery per order. CASCADE on delete.' },
      { name: 'status', type: 'VARCHAR(255)', defaultValue: 'unscheduled', description: 'Delivery state machine (separate from order status).' },
      { name: 'assigned_rider', type: 'VARCHAR(255)', nullable: true, description: 'Rider name / identifier (not an FK).' },
      { name: 'scheduled_date', type: 'DATE', nullable: true, description: 'Planned delivery date.' },
      { name: 'scheduled_time', type: 'VARCHAR(255)', nullable: true, description: 'Planned delivery window.' },
      { name: 'delivery_instructions', type: 'TEXT', nullable: true, description: 'Gate codes, landmarks, etc.' },
      { name: 'failed_reason', type: 'VARCHAR(255)', nullable: true, description: 'Reason for the latest failed attempt.' },
      { name: 'proof_of_delivery_url', type: 'VARCHAR(255)', nullable: true, description: 'Photo / signature URL.' },
      { name: 'attempts', type: 'JSON', nullable: true, description: 'Array of prior delivery attempts (denormalized).' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Row creation timestamp.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Row update timestamp.' },
    ],
  },
];

export const frameworkTables = [
  'password_reset_tokens',
  'sessions',
  'cache / cache_locks',
  'jobs / job_batches / failed_jobs',
  'personal_access_tokens (Sanctum)',
];

export const reviewNotes = [
  {
    title: 'ERD matches the running Laravel schema',
    detail:
      'Tables and foreign keys below come from Laravel migrations and Eloquent models, not from the older phpMyAdmin dump (laravel/database/sql/amora_florals.sql), which is missing later columns such as PayMongo fields, deliveries, and product customisation.',
  },
  {
    title: 'products.category is not related to categories',
    detail:
      'Shop catalog category is a free-text column on products. The categories table is only used by inventory_items. Do not draw a relationship between PRODUCTS and CATEGORIES unless you add a real FK.',
  },
  {
    title: 'Delivery attempts are JSON, not a table',
    detail:
      'deliveries.attempts stores attempt history as JSON. The original plan had a delivery_attempts table; the implemented schema collapsed that into one column.',
  },
  {
    title: 'assigned_rider is not a foreign key',
    detail:
      'Rider assignment is a string on deliveries, not deliveries.assigned_rider_id → users.id. Users.role currently only documents customer | admin (no rider role in Laravel).',
  },
  {
    title: 'Custom arrangements are flags/JSON, not a request entity',
    detail:
      'The Supabase plan had custom_arrangement_requests. Laravel uses orders.order_type = custom plus products.is_customisable / customisation_items.',
  },
];
