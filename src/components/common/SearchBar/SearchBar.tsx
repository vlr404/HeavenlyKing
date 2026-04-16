import { useState } from "react";
import styles from "./SearchBar.module.scss";

// ====== Тип товара ======
export interface Product {
  id: number;
  name: string;
  price: number;
  cat: string;
  img?: string;
  isNew?: boolean;
}

// ====== Демо-товары ======
const DEMO_PRODUCTS: Product[] = [
  { id: 1, name: "Библия в кожаном переплёте", price: 1290, cat: "Книги", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop" },
  { id: 2, name: "Деревянный нательный крест", price: 390, cat: "Украшения", img: "https://ir.ozone.ru/s3/multimedia-1-e/c1000/6975420998.jpg" },
  { id: 3, name: "Икона Богородицы", price: 2100, cat: "Иконы", img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/%D0%95%D0%BB%D0%B5%D1%86%D0%BA%D0%B0%D1%8F-%D0%A7%D0%B5%D1%80%D0%BD%D0%B8%D0%B3%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%B8%D0%BA%D0%BE%D0%BD%D0%B0_%D0%91%D0%BE%D0%B6%D0%B8%D0%B5%D0%B9_%D0%9C%D0%B0%D1%82%D0%B5%D1%80%D0%B8.jpg" },
  { id: 4, name: "Четки из оливкового дерева", price: 560, cat: "Аксессуары", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop" },
  { id: 5, name: "Молитвослов православный", price: 420, cat: "Книги", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop" },
  { id: 6, name: "Свечи церковные (набор 12 шт)", price: 180, cat: "Свечи", img: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=400&h=400&fit=crop" },
  { id: 7, name: "Ладан афонский", price: 340, cat: "Благовония", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
  { id: 8, name: "Псалтирь с толкованием", price: 890, cat: "Книги", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop" },
];

interface SearchBarProps {
  products?: Product[];
  onResults?: (results: Product[]) => void;
  placeholder?: string;
}

export default function SearchBar({
  products = DEMO_PRODUCTS,
  onResults,
  placeholder = "Поиск товаров...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filterProducts = (q: string) =>
    products.filter((p) => {
      const lower = q.toLowerCase();
      return (
        p.name.toLowerCase().includes(lower) ||
        p.cat.toLowerCase().includes(lower)
      );
    });

  const handleChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0);
    onResults?.(value ? filterProducts(value) : products);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    onResults?.(products);
  };

  const handleSelect = (product: Product) => {
    // TODO: замени на навигацию к товару, например navigate(`/shop/${product.id}`)
    setQuery(product.name);
    setIsOpen(false);
  };

  const highlight = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className={styles.highlight}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const filtered = filterProducts(query);

  return (
    <div className={styles.wrapper}>
      {/* Поле ввода */}
      <div className={`${styles.field} ${isOpen ? styles.fieldOpen : ""}`}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {query && (
          <button
            className={styles.clear}
            onClick={handleClear}
            aria-label="Очистить поиск"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Выпадающие результаты */}
      {isOpen && (
        <div className={styles.dropdown}>
          {filtered.length > 0 ? (
            <>
              <p className={styles.count}>
                Найдено: <span>{filtered.length}</span>
              </p>
              <ul className={styles.list}>
                {filtered.map((product) => (
                  <li
                    key={product.id}
                    className={styles.item}
                    onClick={() => handleSelect(product)}
                  >
                    {/* Превью */}
                    <div className={styles.itemThumb}>
                      {product.img ? (
                        <img src={product.img} alt={product.name} />
                      ) : (
                        <span>🛍️</span>
                      )}
                    </div>

                    {/* Название + категория */}
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>
                        {highlight(product.name)}
                      </p>
                      <p className={styles.itemCategory}>
                        {highlight(product.cat)}
                      </p>
                    </div>

                    {/* Цена */}
                    <p className={styles.itemPrice}>
                      {product.price.toLocaleString("ro-MD")} MDL
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className={styles.empty}>
              <span>🔍</span>
              <p>Товар «{query}» не найден</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
