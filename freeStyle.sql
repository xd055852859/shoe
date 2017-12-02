SET NAMES UTF8;
DROP DATABASE IF EXISTS freestyle;
CREATE DATABASE freestyle CHARSET=UTF8;
USE freestyle;
CREATE TABLE shoe_user(
     uid INT PRIMARY KEY AUTO_INCREMENT,
     uname VARCHAR(32),
     upwd VARCHAR(32),
     phone VARCHAR(32),
     email VARCHAR(64)
);
INSERT INTO shoe_user VALUES("1","qiangdong","123456","123456789","123@126.com");

CREATE TABLE shoe_product(
     pid INT PRIMARY KEY AUTO_INCREMENT,
     pname VARCHAR(64),
     mpic VARCHAR(128),
     bpic VARCHAR(128),
     ptype VARCHAR(128)
);
#男子
INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子越野鞋","shoe1_middle_1.jpg|shoe1_middle_2.jpg|shoe1_middle_3.jpg|shoe1_middle_4.jpg|shoe1_middle_5.jpg","shoe1_big_1.jpg|shoe1_big_2.jpg|shoe1_big_3.jpg|shoe1_big_4.jpg|shoe1_big_5.jpg","男子越野鞋");

INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子运动鞋","shoe2_middle_1.jpg|shoe2_middle_2.jpg|shoe2_middle_3.jpg|shoe2_middle_4.jpg|shoe2_middle_5.jpg","shoe2_big_1.jpg|shoe2_big_2.jpg|shoe2_big_3.jpg|shoe2_big_4.jpg|shoe2_big_5.jpg","男子运动鞋");

INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子保温鞋","shoe3_middle_1.jpg|shoe3_middle_2.jpg|shoe3_middle_3.jpg|shoe3_middle_4.jpg|shoe3_middle_5.jpg","shoe3_big_1.jpg|shoe3_big_2.jpg|shoe3_big_3.jpg|shoe3_big_4.jpg|shoe3_big_5.jpg","男子保温鞋");

#女子
INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子保温鞋","shoe3_middle_1.jpg|shoe3_middle_2.jpg|shoe3_middle_3.jpg|shoe3_middle_4.jpg|shoe3_middle_5.jpg","shoe3_big_1.jpg|shoe3_big_2.jpg|shoe3_big_3.jpg|shoe3_big_4.jpg|shoe3_big_5.jpg","男子保温鞋");

INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子保温鞋","shoe3_middle_1.jpg|shoe3_middle_2.jpg|shoe3_middle_3.jpg|shoe3_middle_4.jpg|shoe3_middle_5.jpg","shoe3_big_1.jpg|shoe3_big_2.jpg|shoe3_big_3.jpg|shoe3_big_4.jpg|shoe3_big_5.jpg","男子保温鞋");

INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子保温鞋","shoe3_middle_1.jpg|shoe3_middle_2.jpg|shoe3_middle_3.jpg|shoe3_middle_4.jpg|shoe3_middle_5.jpg","shoe3_big_1.jpg|shoe3_big_2.jpg|shoe3_big_3.jpg|shoe3_big_4.jpg|shoe3_big_5.jpg","男子保温鞋");

#儿童
INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子保温鞋","shoe3_middle_1.jpg|shoe3_middle_2.jpg|shoe3_middle_3.jpg|shoe3_middle_4.jpg|shoe3_middle_5.jpg","shoe3_big_1.jpg|shoe3_big_2.jpg|shoe3_big_3.jpg|shoe3_big_4.jpg|shoe3_big_5.jpg","男子保温鞋");

INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子保温鞋","shoe3_middle_1.jpg|shoe3_middle_2.jpg|shoe3_middle_3.jpg|shoe3_middle_4.jpg|shoe3_middle_5.jpg","shoe3_big_1.jpg|shoe3_big_2.jpg|shoe3_big_3.jpg|shoe3_big_4.jpg|shoe3_big_5.jpg","男子保温鞋");

INSERT INTO shoe_product VALUES(NULL,"adidas阿迪达斯男子保温鞋","shoe3_middle_1.jpg|shoe3_middle_2.jpg|shoe3_middle_3.jpg|shoe3_middle_4.jpg|shoe3_middle_5.jpg","shoe3_big_1.jpg|shoe3_big_2.jpg|shoe3_big_3.jpg|shoe3_big_4.jpg|shoe3_big_5.jpg","男子保温鞋");
CREATE TABLE shoe_product_detail(
    pdid INT PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    price FLOAT(10,2),
    pcolor VARCHAR(128),
    psize FLOAT(10,1),
    pcount VARCHAR(128)
);
INSERT INTO shoe_product_detail VALUES(NULL,1,629.00,"black|幻影黑",42,34);
INSERT INTO shoe_product_detail VALUES(NULL,1,630.00,"blue|忧郁蓝",42,45);
INSERT INTO shoe_product_detail VALUES(NULL,1,631.00,"red|热情红",42,45);
INSERT INTO shoe_product_detail VALUES(NULL,1,632.00,"yellow|高雅黄",42,36);
INSERT INTO shoe_product_detail VALUES(NULL,1,633.00,"green|和平绿",42,42);
INSERT INTO shoe_product_detail VALUES(NULL,1,632.00,"black|幻影黑",42.5,44);
INSERT INTO shoe_product_detail VALUES(NULL,1,634.00,"blue|忧郁蓝",42.5,87);
INSERT INTO shoe_product_detail VALUES(NULL,1,644.00,"red|热情红",42.5,67);
INSERT INTO shoe_product_detail VALUES(NULL,1,634.00,"yellow|高雅黄",42.5,56);
INSERT INTO shoe_product_detail VALUES(NULL,1,635.00,"green|和平绿",42.5,82);
INSERT INTO shoe_product_detail VALUES(NULL,1,643.00,"black|幻影黑",43,73);
INSERT INTO shoe_product_detail VALUES(NULL,1,654.00,"blue|忧郁蓝",43.5,85);
INSERT INTO shoe_product_detail VALUES(NULL,1,635.00,"red|热情红",43.5,189);
INSERT INTO shoe_product_detail VALUES(NULL,1,656.00,"yellow|高雅黄",43.5,78);
INSERT INTO shoe_product_detail VALUES(NULL,1,643.00,"green|和平绿",43.5,64);
INSERT INTO shoe_product_detail VALUES(NULL,1,645.00,"black|幻影黑",44,87);
INSERT INTO shoe_product_detail VALUES(NULL,1,634.00,"blue|忧郁蓝",44,98);
INSERT INTO shoe_product_detail VALUES(NULL,1,645.00,"red|热情红",44,75);
INSERT INTO shoe_product_detail VALUES(NULL,1,634.00,"yellow|高雅黄",44,95);
INSERT INTO shoe_product_detail VALUES(NULL,1,665.00,"green|和平绿",44,88);

INSERT INTO shoe_product_detail VALUES(NULL,2,629.00,"black|幻影黑",42,34);
INSERT INTO shoe_product_detail VALUES(NULL,2,630.00,"blue|忧郁蓝",42,45);
INSERT INTO shoe_product_detail VALUES(NULL,2,631.00,"red|热情红",42,45);
INSERT INTO shoe_product_detail VALUES(NULL,2,632.00,"yellow|高雅黄",42,36);
INSERT INTO shoe_product_detail VALUES(NULL,2,633.00,"green|和平绿",42,42);
INSERT INTO shoe_product_detail VALUES(NULL,2,632.00,"black|幻影黑",42.5,44);
INSERT INTO shoe_product_detail VALUES(NULL,2,634.00,"blue|忧郁蓝",42.5,87);
INSERT INTO shoe_product_detail VALUES(NULL,2,644.00,"red|热情红",42.5,67);
INSERT INTO shoe_product_detail VALUES(NULL,2,634.00,"yellow|高雅黄",42.5,56);
INSERT INTO shoe_product_detail VALUES(NULL,2,635.00,"green|和平绿",42.5,82);
INSERT INTO shoe_product_detail VALUES(NULL,2,643.00,"black|幻影黑",43,73);
INSERT INTO shoe_product_detail VALUES(NULL,2,654.00,"blue|忧郁蓝",43.5,85);
INSERT INTO shoe_product_detail VALUES(NULL,2,635.00,"red|热情红",43.5,189);
INSERT INTO shoe_product_detail VALUES(NULL,2,656.00,"yellow|高雅黄",43.5,78);
INSERT INTO shoe_product_detail VALUES(NULL,2,643.00,"green|和平绿",43.5,64);
INSERT INTO shoe_product_detail VALUES(NULL,2,645.00,"black|幻影黑",44,87);
INSERT INTO shoe_product_detail VALUES(NULL,2,634.00,"blue|忧郁蓝",44,98);
INSERT INTO shoe_product_detail VALUES(NULL,2,645.00,"red|热情红",44,75);
INSERT INTO shoe_product_detail VALUES(NULL,2,634.00,"yellow|高雅黄",44,95);
INSERT INTO shoe_product_detail VALUES(NULL,2,665.00,"green|和平绿",44,88);

INSERT INTO shoe_product_detail VALUES(NULL,3,629.00,"black|幻影黑",42,34);
INSERT INTO shoe_product_detail VALUES(NULL,3,630.00,"blue|忧郁蓝",42,45);
INSERT INTO shoe_product_detail VALUES(NULL,3,631.00,"red|热情红",42,45);
INSERT INTO shoe_product_detail VALUES(NULL,3,632.00,"yellow|高雅黄",42,36);
INSERT INTO shoe_product_detail VALUES(NULL,3,633.00,"green|和平绿",42,42);
INSERT INTO shoe_product_detail VALUES(NULL,3,632.00,"black|幻影黑",42.5,44);
INSERT INTO shoe_product_detail VALUES(NULL,3,634.00,"blue|忧郁蓝",42.5,87);
INSERT INTO shoe_product_detail VALUES(NULL,3,644.00,"red|热情红",42.5,67);
INSERT INTO shoe_product_detail VALUES(NULL,3,634.00,"yellow|高雅黄",42.5,56);
INSERT INTO shoe_product_detail VALUES(NULL,3,635.00,"green|和平绿",42.5,82);
INSERT INTO shoe_product_detail VALUES(NULL,3,643.00,"black|幻影黑",43,73);
INSERT INTO shoe_product_detail VALUES(NULL,3,654.00,"blue|忧郁蓝",43.5,85);
INSERT INTO shoe_product_detail VALUES(NULL,3,635.00,"red|热情红",43.5,189);
INSERT INTO shoe_product_detail VALUES(NULL,3,656.00,"yellow|高雅黄",43.5,78);
INSERT INTO shoe_product_detail VALUES(NULL,3,643.00,"green|和平绿",43.5,64);
INSERT INTO shoe_product_detail VALUES(NULL,3,645.00,"black|幻影黑",44,87);
INSERT INTO shoe_product_detail VALUES(NULL,3,634.00,"blue|忧郁蓝",44,98);
INSERT INTO shoe_product_detail VALUES(NULL,3,645.00,"red|热情红",44,75);
INSERT INTO shoe_product_detail VALUES(NULL,3,634.00,"yellow|高雅黄",44,95);
INSERT INTO shoe_product_detail VALUES(NULL,3,665.00,"green|和平绿",44,88);


CREATE TABLE shoe_cart(
     cid INT PRIMARY KEY AUTO_INCREMENT,
     userId INT
);

INSERT INTO shoe_cart VALUES("100","1");

CREATE TABLE shoe_cart_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,
    cartId INT,
    productId INT,
    psize FLOAT(10,1),
    pcolor VARCHAR(128),
    price FLOAT(10,2),
    count INT
);
--#订单数据库 rcvName 收货实名 price 价格 payment 付款方式 (orderTime INT) 下单时间 status (订单状态 INT)
--# useId (下单用户ID)
--CREATE TABLE shoe_order(
--    oid INT PRIMARY KEY AUTO_INCREMENT,
--    orderNum BIGINT, #10位随机数
--    rcvName VARCHAR(128),
--    price FLOAT(10,2),
--    payment INT,#1-货到付款 2-支付宝支付 3-京东支付
--    orderTime VARCHAR(128),
--    status INT,#1-等待付款，2-等待配送 3-运输中 4-已签收
--    userId INT,
--    #cartId INT
--);
--INSERT INTO shoe_order VALUES(101,233324242,"刘强东","1234.56",1,233424554,2,1,1);
--CREATE TABLE shoe_order_detail(
--    did INT PRIMARY KEY AUTO_INCREMENT,
--    orderId INT,
--    productId INT,
--    count INT
--);
--INSERT INTO shoe_order_detail VALUES
--(1,101,1,3),
--(2,101,1,1),
--(3,101,1,2);