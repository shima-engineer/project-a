import { Sparkles } from 'lucide-react'

const CategoryFilter = () => {
  return (
    <section>
        <h2>カテゴリー</h2>
        <ul>
            <li className="flex items-center gap-2"><Sparkles />カテゴリー1</li>
            <li>カテゴリー2</li>
            <li>カテゴリー3</li>        
        </ul>
    </section>
  )
}

export default CategoryFilter