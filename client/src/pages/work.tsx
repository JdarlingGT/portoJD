import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { caseStudies, CaseStudy } from "@/data/case-studies";
import { ProjectCard } from "@/components/ui/card-v2";
import { FilterChips, FilterOption } from "@/components/ui/filter-chips";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { analytics } from "@/lib/analytics";
import { Link } from "wouter";

// Calculate reading time estimate
function getReadingTime(caseStudy: CaseStudy): string {
  const wordsPerMinute = 200;
  const textContent = [
    caseStudy.problem,
    caseStudy.approach,
    caseStudy.learnings.join(' '),
    caseStudy.constraints.join(' ')
  ].join(' ');
  
  const wordCount = textContent.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Extract key metrics from case study results
function getTopKPIs(caseStudy: CaseStudy): Array<{ label: string; value: string }> {
  return caseStudy.results
    .filter(result => result.delta)
    .sort((a, b) => {
      const deltaA = parseInt(a.delta?.replace(/[^0-9]/g, '') || '0');
      const deltaB = parseInt(b.delta?.replace(/[^0-9]/g, '') || '0');
      return deltaB - deltaA;
    })
    .slice(0, 2)
    .map(result => ({
      label: result.metric,
      value: result.delta || result.value
    }));
}

export default function Work() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  

  // Prepare filter options with counts
  const filterOptions: FilterOption[] = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    
    caseStudies.forEach(study => {
      study.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([tag, count]) => ({
        id: tag.toLowerCase().replace(/\s+/g, '-'),
        label: tag,
        count
      }));
  }, []);

  // Setup fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(caseStudies, {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'problem', weight: 0.25 },
        { name: 'approach', weight: 0.2 },
        { name: 'tags', weight: 0.15 },
        { name: 'stack', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true
    });
  }, []);

  // Filter and search case studies
  const filteredCaseStudies = useMemo(() => {
    let results = caseStudies;

    // Apply tag filters
    if (selectedTags.length > 0) {
      const tagNames = selectedTags.map(tagId => 
        filterOptions.find(option => option.id === tagId)?.label
      ).filter((label): label is string => Boolean(label));
      
      results = results.filter(study =>
        tagNames.some(tag => study.tags.includes(tag))
      );
    }

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery.trim());
      const searchSlugs = new Set(searchResults.map(result => result.item.slug));
      results = results.filter(study => searchSlugs.has(study.slug));
    }

    return results;
  }, [selectedTags, searchQuery, filterOptions, fuse]);

  const handleTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
    analytics.track('filter_select', { tags: tags.join(',') });
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      analytics.track('search_query', { query });
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleCaseStudyClick = useCallback((slug: string) => {
    analytics.trackCaseStudyOpen(slug);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground page-enter">
      <Header />

      <main className="py-section page-enter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-6 animate-fade-in">
              <h1 className="text-h1 animate-slide-up" data-testid="work-page-heading">
                Case Studies & Deep Dives
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up stagger-1" data-testid="work-page-description">
                Detailed breakdowns of marketing systems architecture, strategic implementation, and measurable impact across diverse projects and challenges.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-6 mb-12">
              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search case studies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-10 focus-ring animate-slide-up stagger-2"
                    data-testid="work-search-input"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      data-testid="search-clear"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Filter Chips */}
              <div className="animate-slide-up stagger-3">
                <FilterChips
                  options={filterOptions}
                  value={selectedTags}
                  onValueChange={handleTagsChange}
                  multiSelect={true}
                  urlSync={{ paramName: 'tags' }}
                  className="justify-center"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8 animate-fade-in stagger-4">
              <p className="text-sm text-muted-foreground" data-testid="results-count">
                {filteredCaseStudies.length} {filteredCaseStudies.length === 1 ? 'project' : 'projects'}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Case Studies Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredCaseStudies.map(caseStudy => {
                const kpis = getTopKPIs(caseStudy);
                const readingTime = getReadingTime(caseStudy);
                
                return (
                  <div key={caseStudy.slug} className={`animate-scale-in stagger-${Math.min((196 + caseStudies.findIndex(cs => cs.slug === caseStudy.slug)) % 5 + 1, 5)}`}>
                    <Link href={`/work/${caseStudy.slug}`}>
                      <ProjectCard
                        title={`${caseStudy.emoji} ${caseStudy.title}`}
                        description={caseStudy.problem}
                        kpis={kpis}
                        tags={caseStudy.tags}
                        readingTime={readingTime}
                        onClick={() => handleCaseStudyClick(caseStudy.slug)}
                        className="h-full cursor-pointer focus-ring"
                        data-testid={`case-study-card-${caseStudy.slug}`}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredCaseStudies.length === 0 && (
              <div className="text-center py-20" data-testid="no-results">
                <div className="space-y-4">
                  <div className="text-6xl opacity-20">🔍</div>
                  <h3 className="text-h2 text-muted-foreground">No projects found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {searchQuery || selectedTags.length > 0 
                      ? "Try adjusting your search terms or filters to find what you're looking for."
                      : "No case studies are available at the moment."
                    }
                  </p>
                  {(searchQuery || selectedTags.length > 0) && (
                    <div className="flex gap-3 justify-center mt-6">
                      {searchQuery && (
                        <Button variant="outline" onClick={clearSearch} data-testid="clear-search-empty">
                          Clear search
                        </Button>
                      )}
                      {selectedTags.length > 0 && (
                        <Button variant="outline" onClick={() => handleTagsChange([])} data-testid="clear-filters-empty">
                          Clear filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
