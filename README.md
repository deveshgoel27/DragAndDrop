🧱 Drag-and-Drop Website Builder
A modern drag-and-drop website builder built with React, Tailwind CSS, React DnD, and shadcn/ui. This project allows users to visually build simple websites by dragging and placing elements such as text, images, and buttons into a design canvas — with the ability to configure each element using forms.

🚀 Features
✅ 1. Drag-and-Drop Interface
Users can drag elements (Text, Image, Button) from the sidebar and drop them into a canvas.

Built using react-dnd and react-dnd-html5-backend.

✅ 2. Element Customization
After placing an element in the canvas, users can select it and configure its properties using a form.

Text → Customizable content

Image → Editable image URL

Button → Editable button label

✅ 3. Responsive Design
The interface uses Tailwind CSS and is fully responsive for both desktop and mobile devices.

✅ 4. Modern UI with shadcn/ui
Components like Cards, Inputs, and Buttons are built using the shadcn/ui component library for a clean and accessible design.

✅ 5. Scalable Code Architecture
Modular React components for drag area, drop canvas, property form, and UI logic.

Easy to extend with more element types or layout templates in the future.

📁 Project Structure
bash
Copy
Edit
src/
│
├── components/
│   └── ui/              # shadcn/ui components (Button, Card, Input)
│
├── DragDropBuilder.jsx  # Main drag-and-drop builder logic
│
├── App.jsx              # Entry component rendering DragDropBuilder
│
├── index.css            # Tailwind CSS setup
├── tailwind.config.js   # Tailwind config file
└── main.jsx             # App entry point (Vite or CRA)
🔧 Tech Stack
React – Frontend framework

Tailwind CSS – Utility-first CSS for styling

react-dnd – Drag-and-drop library

shadcn/ui – Modern React component library

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

📄 License
This project is licensed under the MIT License.

