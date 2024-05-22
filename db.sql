CREATE TABLE `ks_product` (
  `product_id` varchar(36) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category_id` varchar(36) NOT NULL,
  `stock` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci