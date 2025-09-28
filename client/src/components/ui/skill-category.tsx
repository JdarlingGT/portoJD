import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/data/skills";

interface SkillCategoryProps {
  category: SkillCategory;
  className?: string;
}

export function SkillCategoryComponent({ category, className = "" }: SkillCategoryProps) {
  const getLevelColor = (level: number) => {
    switch (level) {
      case 5: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case 4: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case 3: return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case 2: return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case 1: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 5: return "Expert";
      case 4: return "Advanced";
      case 3: return "Intermediate";
      case 2: return "Basic";
      case 1: return "Learning";
      default: return "Unknown";
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`} data-testid={`skill-category-${category.id}`}>
      <h3 className="text-2xl font-semibold mb-2 flex items-center" data-testid={`skill-category-title-${category.id}`}>
        <span className="text-2xl mr-2">{category.icon}</span>
        {category.name}
      </h3>
      <p className="text-muted-foreground mb-6" data-testid={`skill-category-description-${category.id}`}>
        {category.description}
      </p>
      
      <div className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between" data-testid={`skill-item-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="font-medium">{skill.name}</span>
            <Badge 
              className={getLevelColor(skill.level)}
              data-testid={`skill-level-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {getLevelLabel(skill.level)}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
