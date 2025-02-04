
const express = require('express')
const multerMiddleware = require('../middleware/multerMiddleware');
const Course = require('../models/Courses')
const { authenticate, isAdminOrSuperAdmin } = require('../middleware/Authenticate');
const router = express.Router();
const User = require('../models/User')

const crypto = require('crypto')
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const payment=require('../models/payment') 
const instance=require('../Razorpayinstance')




router.post('/adds', authenticate, multerMiddleware, isAdminOrSuperAdmin, async (req, res) => {
  console.log("inside course");
  const { title, description, category, createdBy, price } = req.body;

  const image = req.files?.image?.[0]?.path || null;
  try {
    const existingproject = await Course.findOne({ title })
    if (existingproject) {
      return res.status(400).json({ message: 'Project already exists' });
    }
    else {

      const newCourse = new Course({
        title,
        description,
        category,
        createdBy,
        image,
        price,
        teacher: req.user.id,
      });
      await newCourse.save();
      return res.status(200).json({ message: 'Course added successfully', course: newCourse });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
    console.error('Error adding course:', err);

  }

})


router.get('/getcourse', async (req, res) => {
  try {
    const courses = await Course.find();  
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses available" });
    }

    res.status(200).json(courses);  
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});





  // Assuming you have a try-catch utility

// Initialize Razorpay instance


router.post('/checkout/:category', authenticateToken, async (req, res) => {
  try {
      // Find user from the database
      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Find courses based on the provided category
      const courses = await Course.find({ category: req.params.category });
      if (courses.length === 0) {
          return res.status(404).json({ message: "No courses found in this category" });
      }

      // Check if the user is already subscribed to any course in this category
      const alreadySubscribed = courses.some(course => user.subscription.includes(course._id));
      if (alreadySubscribed) {
          return res.status(400).json({
              message: "You are already subscribed to a course in this category",
          });
      }

      // Calculate the total amount (sum of all course prices in this category)
      const totalAmount = courses.reduce((sum, course) => sum + (course.price || 0), 0);

      // Ensure there is a valid total amount
      if (totalAmount === 0) {
          return res.status(400).json({ message: "Invalid course fees" });
      }

      // Prepare options for Razorpay order creation
      const options = {
          amount: totalAmount * 100,  // Convert to paise
          currency: "INR",
          receipt: `receipt_${req.user._id}_${Date.now()}`,
      };

      // Create order using Razorpay API
      const order = await instance.orders.create(options);

      // Respond with the order details and courses in the category
      res.status(201).json({
          order,
          courses,
      });

  } catch (error) {
      console.error("Checkout Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
});









// 🔹 Payment Verification API
router.post('/payment/verify/:orderId', authenticateToken, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseId } = req.body;

    // 🔹 Generate Expected Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    await payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user: req.user._id,
      course: courseId,
    });

    // 🔹 Add course to user subscription
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.subscription.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Course Purchased successfully' });
  } catch (err) {
    console.error('Payment Verification Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.delete("/:id",authenticate ,isAdminOrSuperAdmin, async (req, res) => {
  try {
    const courseId = req.params.id;

      // Check if the user is an admin
      if (req.user.role !== "admin") {
          return res.status(403).json({ message: "Access Denied! Only admin can delete courses." });
      }

      // Find and delete the course
      const deletedCourse = await Course.findById(courseId);
        await Course.findByIdAndDelete(courseId);

      if (!deletedCourse) {
          return res.status(404).json({ message: "Course not found!" });
      }

      res.status(200).json({ message: "Course deleted successfully!", deletedCourse });
  } catch (error) {
      res.status(500).json({ message: "Server error! Unable to delete course.", error });
  }
});

module.exports = router

