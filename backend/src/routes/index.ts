import { Router } from 'express';
import { login, register, getProfile } from '../controllers/authController';
import { getProducts, getCategories, getProductBySlug, addReview, newsletterSignup } from '../controllers/productController';
import { createOrder, getOrderHistory, trackOrder } from '../controllers/orderController';
import { processStripePayment, processRazorpayPayment, verifyRazorpayPayment, processPayPalPayment, verifyPayPalPayment } from '../controllers/paymentController';
import { getDashboardAnalytics, getAdminOrders, updateOrderStatus, createProduct, updateProduct, deleteProduct } from '../controllers/adminController';
import { authenticateJWT } from '../middleware/auth';
import { isAdmin } from '../middleware/role';

const router = Router();

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', authenticateJWT, getProfile);

// Public Products Routes
router.get('/products/categories', getCategories);
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.post('/products/reviews', authenticateJWT, addReview);
router.post('/newsletter', newsletterSignup);

// Order Routes
router.post('/orders', authenticateJWT, createOrder);
router.get('/orders/history', authenticateJWT, getOrderHistory);
router.get('/orders/track/:orderNumber', trackOrder);

// Payment Integration Routes
router.post('/payments/stripe', processStripePayment);
router.post('/payments/razorpay', processRazorpayPayment);
router.post('/payments/razorpay/verify', verifyRazorpayPayment);
router.post('/payments/paypal', processPayPalPayment);
router.post('/payments/paypal/verify', verifyPayPalPayment);

// Admin Console Routes
router.get('/admin/analytics', authenticateJWT, isAdmin, getDashboardAnalytics);
router.get('/admin/orders', authenticateJWT, isAdmin, getAdminOrders);
router.patch('/admin/orders/:orderId', authenticateJWT, isAdmin, updateOrderStatus);
router.post('/admin/products', authenticateJWT, isAdmin, createProduct);
router.put('/admin/products/:id', authenticateJWT, isAdmin, updateProduct);
router.delete('/admin/products/:id', authenticateJWT, isAdmin, deleteProduct);

export default router;
