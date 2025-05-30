# Data Pusher API

A Node.js-based API for managing accounts, destinations, and sending incoming data to account-specific destinations via webhooks.

---

## 🚀 Features

- Create and manage accounts
- Configure destinations per account
- Accept and forward incoming data using account-specific webhooks
- API documentation via Swagger

---

## 📦 Installation

```bash
git https://github.com/anandkva/project-data-pusher.git
cd project-data-pusher
npm install
```

---

## ▶️ Run the Project

```bash
npm start
```

---

## 📚 API Documentation

Visit Swagger UI at:

```
https://project-data-pusher.onrender.com/api-docs
```

---

## 📂 Folder Structure

```
.
├── controllers/
├── routes/
├── models/
├── utils/
├── Swagger.json
├── app.js
└── README.md
```

---

## ✍️ Sample Request

**POST /accounts**

```json
{
  "email": "john@example.com",
  "accountName": "Example Corp",
  "website": "https://example.com"
}
```

**POST /server/incoming_data**

Headers:

```
CL-X-TOKEN: your_account_id
```

Body:

```json
{
  "user": "Anand",
  "action": "update"
}
```

---

## 🧪 Testing

You can use tools like **Postman** or **cURL** to test the endpoints, or explore directly via Swagger UI at `/api-docs`.

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

## 🤝 Contributing

Feel free to fork and create pull requests. Feedback and improvements are welcome!

```javascript
Let me know if you need a "LICENSE" file or Postman collection for this API.
```
