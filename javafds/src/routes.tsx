import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import HomePage from '@/pages/customer/HomePage';
import ProductListPage from '@/pages/customer/ProductListPage';
import ProductDetailPage from '@/pages/customer/ProductDetailPage';
import CategoriesPage from '@/pages/customer/CategoriesPage';
import OffersPage from '@/pages/customer/OffersPage';
import CustomerDashboardPage from '@/pages/customer/CustomerDashboardPage';
import CartPage from '@/pages/customer/CartPage';
import CheckoutPage from '@/pages/customer/CheckoutPage';
import OrdersPage from '@/pages/customer/OrdersPage';
import OrderDetailPage from '@/pages/customer/OrderDetailPage';
import LoyaltyPage from '@/pages/customer/LoyaltyPage';
import NotificationsPage from '@/pages/customer/NotificationsPage';
import ProfilePage from '@/pages/customer/ProfilePage';
import LoginPage from '@/pages/customer/LoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminProductsPage from '@/pages/admin/AdminProductsPage';
import AdminCategoriesPage from '@/pages/admin/AdminCategoriesPage';
import AdminInventoryPage from '@/pages/admin/AdminInventoryPage';
import AdminRestockPage from '@/pages/admin/AdminRestockPage';
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage';
import AdminPosPage from '@/pages/admin/AdminPosPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminAdvertisementsPage from '@/pages/admin/AdminAdvertisementsPage';
import AdminOffersPage from '@/pages/admin/AdminOffersPage';
import AdminLoyaltyPage from '@/pages/admin/AdminLoyaltyPage';
import AdminReportsPage from '@/pages/admin/AdminReportsPage';
import AdminAnalyticsPage from '@/pages/admin/AdminAnalyticsPage';
import AdminAuditLogsPage from '@/pages/admin/AdminAuditLogsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminAddProductPage from '@/pages/admin/AdminAddProductPage';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductListPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  component: ProductDetailPage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: CategoriesPage,
});

const offersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers',
  component: OffersPage,
});

const customerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer',
  component: CustomerDashboardPage,
});

const customerProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/products',
  component: ProductListPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/cart',
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/checkout',
  component: CheckoutPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/orders',
  component: OrdersPage,
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/orders/$id',
  component: OrderDetailPage,
});

const loyaltyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/loyalty',
  component: LoyaltyPage,
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/notifications',
  component: NotificationsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/profile',
  component: ProfilePage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products',
  component: AdminProductsPage,
});

const adminAddProductRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products/new',
  component: AdminAddProductPage,
});

const adminCategoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/categories',
  component: AdminCategoriesPage,
});

const adminInventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/inventory',
  component: AdminInventoryPage,
});

const adminRestockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/restock',
  component: AdminRestockPage,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders',
  component: AdminOrdersPage,
});

const adminPosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/pos',
  component: AdminPosPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/users',
  component: AdminUsersPage,
});

const adminAdvertisementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/advertisements',
  component: AdminAdvertisementsPage,
});

const adminOffersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/offers',
  component: AdminOffersPage,
});

const adminLoyaltyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/loyalty',
  component: AdminLoyaltyPage,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reports',
  component: AdminReportsPage,
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/analytics',
  component: AdminAnalyticsPage,
});

const adminAuditLogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/audit-logs',
  component: AdminAuditLogsPage,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/settings',
  component: AdminSettingsPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  productsRoute,
  productDetailRoute,
  categoriesRoute,
  offersRoute,
  customerDashboardRoute,
  customerProductsRoute,
  cartRoute,
  checkoutRoute,
  ordersRoute,
  orderDetailRoute,
  loyaltyRoute,
  notificationsRoute,
  profileRoute,
  adminDashboardRoute,
  adminProductsRoute,
  adminAddProductRoute,
  adminCategoriesRoute,
  adminInventoryRoute,
  adminRestockRoute,
  adminOrdersRoute,
  adminPosRoute,
  adminUsersRoute,
  adminAdvertisementsRoute,
  adminOffersRoute,
  adminLoyaltyRoute,
  adminReportsRoute,
  adminAnalyticsRoute,
  adminAuditLogsRoute,
  adminSettingsRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
