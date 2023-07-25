// cartController.js

const Cart = require('../models/Cart.model');
const Cloth = require('../models/Cloth.model');
const Order = require('../models/Order.model');

exports.CartController = {
  // Получение содержимого корзины пользователя
  getUserCart: async (req, res) => {
    try {
      // Найти корзину пользователя по userId и заполнить информацию о товарах с помощью `populate`
      const data = await Cart.findOne({ userId: req.user.id }).populate({
        path: 'cart.cloth',
        populate: {
          path: 'collections',
        },
      });
      res.json(data);
    } catch (error) {
      // Обработка ошибки при получении корзины пользователя
      res.status(500).json({ error: 'Ошибка получения корзины пользователя' });
    }
  },

  // Добавление товара в корзину пользователя
  addCloth: async (req, res) => {
    try {
      const { id } = req.params;
      // Найти информацию о размерах товара по его идентификатору
      const { size } = await Cloth.findById(id);
      const { inStock } = size.find((item) => item.size === req.body.size);
      const { cart } = await Cart.findOne({ userId: req.user.id });

      // Проверить, есть ли уже такой товар в корзине пользователя и сколько доступно в наличии
      const inCart = cart.find(
        (item) => item.cloth.toString() === id && item.size === req.body.size
      );

      // Проверить наличие товара в базе данных и его доступность в наличии
      if (!inCart && inStock === 0) {
        res.json('Товара нет в наличии');
        return;
      }

      // Обновление корзины пользователя: увеличить количество товара, если он уже есть в корзине,
      // или добавить новый элемент в корзину
      const newCart = cart.map((item) => {
        if (item.cloth.toString() === id && item.size === req.body.size) {
          item.amount += 1;
        }
        return item;
      });

      if (!inCart) {
        newCart.push({ cloth: id, size: req.body.size });
      }

      // Сохранить обновленную корзину в базе данных
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
      res.json(existingCartItem ? 'Товар добавлен в корзину' : 'Товара нет в наличии');
    } catch (error) {
      // Обработка ошибки при добавлении товара в корзину
      res.status(500).json({ error: 'ошибка добавления в корзину' });
    }
  },

  // Уменьшение количества товара в корзине пользователя
  minusCloth: async (req, res) => {
    try {
      const { id } = req.params;
      const { cart } = await Cart.findOne({ userId: req.user.id });

      // Уменьшить количество товара в корзине, если оно больше 1
      const newCart = cart.map((item) => {
        if (item.cloth.toString() === id && item.size === req.body.size) {
            // уменьшаем на 1 но не меньше 0
          item.amount = Math.max(item.amount - 1, 0);
        }
        return item;
      });

      // Сохранить обновленную корзину в базе данных
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
      res.json('Товар удален с корзины');
    } catch (error) {
      // Обработка ошибки при уменьшении количества товара в корзине
      res.status(500).json({ error: 'Ошибка при удалении товара с корзины' });
    }
  },

  // Удаление товара из корзины пользователя
  removeCloth: async (req, res) => {
    try {
      const { id } = req.params;
      const { cart } = await Cart.findOne({ userId: req.user.id });

      // Фильтрация корзины, чтобы удалить товар с заданным id и размером
      const newCart = cart.filter(
        (item) => item.cloth.toString() !== id || item.size !== req.body.size
      );

      // Сохранить обновленную корзину в базе данных
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
      res.json('Товар удален из корзины');
    } catch (error) {
      // Обработка ошибки при удалении товара из корзины
      res.status(500).json({ error: 'Ошибка при удалении товара с корзины пользователя' });
    }
  },
  buyCloths: async (req, res) => {
    try {
      // Найти корзину пользователя и заполнить информацию о товарах
      const { cart } = await Cart.findOne({ userId: req.user.id }).populate("cart.cloth").lean();
  
      // Обновить наличие товаров в базе данных
      for (const item of cart) {
        const clothId = item.cloth._id;
        const { size } = await Cloth.findById(clothId);
  
        // Уменьшить количество товара в наличии на количество в корзине
        const newSize = size.map((el) => {
          if (el.size === item.size) {
            el.inStock = Math.max(el.inStock - item.amount, 0);
          }
          return el;
        });
  
        // Обновить количество товара в базе данных
        await Cloth.findByIdAndUpdate(clothId, { size: newSize });
      }
  
      // Рассчитать общую стоимость покупки
      const total = cart.reduce((accumulator, item) => {
        return accumulator + item.cloth.price * item.amount;
      }, 0);
  
      // Создать новый заказ
      const number = await Order.find();
      const newOrder = {
        userId: req.user.id,
        orderNumber: number.length,
        products: cart,
        city: req.body.city,
        address: req.body.address,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        comment: req.body.comment,
        total,
      };
      await Order.create(newOrder);
  
      // Очистить корзину пользователя
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: [] });
  
      res.json("Покупка успешно оформлена");
    } catch (error) {
      // Обработка ошибки при оформлении покупки
      res.status(500).json({ error: "Ошибка при оформлении покупки" });
    }
  },  
};
