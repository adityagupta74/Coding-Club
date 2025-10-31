export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6 mt-8">
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Shyam Yadav. All rights reserved.
      </div>
    </footer>
  );
}