import { useEffect, useState } from 'react';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Button } from '../../../components/base/Button';
import { Link } from 'react-router-dom';
import { useResources } from '../../../contexts/ResourceContext';
import type { Article, Category, Interview, Resource, Tool, Video } from '../../../contexts/type';

export default function AdminResourcesPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'videos' | 'articles' | 'tools' | 'interview'>('categories');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | Resource | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { categories, resources, addCategory, addResource, deleteCategory, updateResource, deleteResource, editCategory } = useResources();

  const tabs = [
    { id: 'categories', name: 'Categories', icon: 'ri-folder-line' },
    { id: 'videos', name: 'Video Tutorials', icon: 'ri-video-line' },
    { id: 'articles', name: 'Articles & Guides', icon: 'ri-article-line' },
    { id: 'tools', name: 'Tools & Resources', icon: 'ri-tools-line' },
    { id: 'interview', name: 'Interview Prep', icon: 'ri-briefcase-line' }
  ];


  // Type for formData
  const [categoryFormData, setCategoryFormData] = useState<Category>({
    id: '',
    name: '',
    description: '',
    icon: '',
    color: '',
    resourceCount: 0,
  });

  const [videoFormData, setVideoFormData] = useState<Video>({
    id: '',
    title: '',
    author: '',
    duration: '',
    level: '',
    category: '',
    status: 'published',
    createdAt: '',
    type: 'video',
    thumbnail: '',
    url: '',
  });

  const [articleFormData, setArticleFormData] = useState<Article>({
    id: '',
    title: '',
    author: '',
    readTime: '',
    category: '',
    articleCategory: '',
    url: '',
    status: 'published',
    createdAt: '',
    type: 'article',
  });

  const [toolFormData, setToolFormData] = useState<Tool>({
    id: '',
    name: '',
    description: '',
    category: '',
    toolCategory: '',
    url: '',
    status: 'published',
    createdAt: '',
    type: 'tool',
  });

  // Form data for Interview type
  const [interviewFormData, setInterviewFormData] = useState<Interview>({
    id: '',
    title: '',
    questionType: 'Question Bank', // Default value
    difficulty: 'Mixed',           // Default value
    category: '',
    url: '',
    status: 'published',
    createdAt: '',
    type: 'interview',
  });



  const handleAddNew = () => {
    setEditingItem(null);

    if (activeTab === 'categories') {
      // Reset to empty Category
      setCategoryFormData({
        id: '',
        name: '',
        description: '',
        icon: '',
        color: '',
        resourceCount: 0,
      });
    } else if (activeTab === 'videos') {
      // Reset to empty Video form
      setVideoFormData({
        id: '',
        title: '',
        author: '',
        duration: '',
        level: '',
        category: '',
        status: 'published',
        createdAt: '',
        type: 'video',
        thumbnail: '',
        url: '',
      });
    } else if (activeTab === 'articles') {
      // Reset to empty Article form
      setArticleFormData({
        id: '',
        title: '',
        author: '',
        readTime: '',
        category: '',
        articleCategory: '',
        url: '',
        status: 'published',
        createdAt: '',
        type: 'article',
      });
    } else if (activeTab === 'tools') {
      // Reset to empty Tool form
      setToolFormData({
        id: '',
        name: '',
        description: '',
        category: '',
        toolCategory: '',
        url: '',
        status: 'published',
        createdAt: '',
        type: 'tool',
      });
    } else if (activeTab === 'interview') {
      // Reset to empty Interview form
      setInterviewFormData({
        id: '',
        title: '',
        questionType: 'Question Bank', // Default value
        difficulty: 'Mixed',           // Default value
        category: '',
        url: '',
        status: 'published',
        createdAt: '',
        type: 'interview',
      });
    }

    setShowAddModal(true); // Show the modal
  };


  const handleEdit = (item: any) => {
    setEditingItem(item);

    if (activeTab === 'categories') {
      // If editing a category, set the category form data
      setCategoryFormData({
        id: item.id,
        name: item.name,
        description: item.description,
        icon: item.icon,
        color: item.color,
        resourceCount: item.resourceCount,
      });
    } else if (activeTab === 'videos') {
      // If editing a video, set the video form data
      setVideoFormData({
        id: item.id,
        title: item.title,
        author: item.author,
        duration: item.duration,
        level: item.level,
        category: item.category,
        status: item.status,
        createdAt: item.createdAt,
        type: 'video',
        thumbnail: item.thumbnail,
        url: item.url,
      });
    } else if (activeTab === 'articles') {
      // If editing an article, set the article form data
      setArticleFormData({
        id: item.id,
        title: item.title,
        author: item.author,
        readTime: item.readTime,
        category: item.category,
        articleCategory: item.articleCategory,
        url: item.url,
        status: item.status,
        createdAt: item.createdAt,
        type: 'article',
      });
    } else if (activeTab === 'tools') {
      // If editing a tool, set the tool form data
      setToolFormData({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        toolCategory: item.toolCategory,
        url: item.url,
        status: item.status,
        createdAt: item.createdAt,
        type: 'tool',
      });
    } else if (activeTab === 'interview') {
      // If editing an interview, set the interview form data
      setInterviewFormData({
        id: item.id,
        title: item.title,
        questionType: item.questionType,
        difficulty: item.difficulty,
        category: item.category,
        url: item.url,
        status: item.status,
        createdAt: item.createdAt,
        type: 'interview',
      });
    }

    setShowAddModal(true); // Show the modal
  };



  const handleDelete = (id: string, type: string) => {
    if (type === 'categories') {
      deleteCategory(id); // Use context's deleteCategory
    } else {
      deleteResource(id, type); // Use context's deleteResource
    }
  };

  const handleSave = () => {
    if (activeTab === 'categories') {
      // Handle saving or updating a category
      if (editingItem) {
        const updatedCategory: Category = { ...categoryFormData, id: editingItem.id };
        editCategory(editingItem.id, updatedCategory); // Update category using context's editCategory
      } else {
        const newCategory: Category = {
          ...categoryFormData,
          id: Date.now().toString(), // Generate a unique ID for new category
          resourceCount: 0, // Initialize resource count to 0
        };
        addCategory(newCategory); // Add new category using context's addCategory
      }
    } else {
      console.log("EDITING ITEM TYPE ", videoFormData);

      // Handle saving or updating a resource
      if (editingItem) {
        // Check which resource type is being edited

        if ('category' in videoFormData) {
          // Handle editing Video
          if (videoFormData.type === 'video') {
            const updatedResource: Video = { ...videoFormData, id: editingItem.id };
            updateResource(editingItem.id, updatedResource); // Update Video resource
          }
        } else if ('articleCategory' in articleFormData) {
          // Handle editing Article
          if (articleFormData.type === 'article') {
            const updatedResource: Article = { ...articleFormData, id: editingItem.id };
            updateResource(editingItem.id, updatedResource); // Update Article resource
          }
        } else if ('toolCategory' in toolFormData) {
          // Handle editing Tool
          if (toolFormData.type === 'tool') {
            const updatedResource: Tool = { ...toolFormData, id: editingItem.id };
            updateResource(editingItem.id, updatedResource); // Update Tool resource
          }
        } else if ('questionType' in interviewFormData) {
          // Handle editing Interview
          if (interviewFormData.type === 'interview') {
            const updatedResource: Interview = { ...interviewFormData, id: editingItem.id };
            updateResource(editingItem.id, updatedResource); // Update Interview resource
          }
        }
      } else {
        // Adding a new resource based on type (Video, Article, Tool, Interview)
        console.log("ADDING NEW RESOURCE TYPE ", videoFormData);
        if (videoFormData.type === 'video') {
          const newResource: Video = {
            ...videoFormData,
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0], // Set created date
          };
          addResource(newResource); // Add new Video resource using context's addResource
        } else if (articleFormData.type === 'article') {
          const newResource: Article = {
            ...articleFormData,
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0], // Set created date
          };
          addResource(newResource); // Add new Article resource using context's addResource
        } else if (toolFormData.type === 'tool') {
          const newResource: Tool = {
            ...toolFormData,
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0], // Set created date
          };
          addResource(newResource); // Add new Tool resource using context's addResource
        } else if (interviewFormData.type === 'interview') {
          const newResource: Interview = {
            ...interviewFormData,
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0], // Set created date
          };
          addResource(newResource); // Add new Interview resource using context's addResource
        }
      }
    }

    // After saving, close the modal, reset form data, and reset the editing item
    setShowAddModal(false);
    setVideoFormData({
      id: '',
      title: '',
      author: '',
      duration: '',
      level: '',
      category: '',
      status: 'published',
      createdAt: '',
      type: 'video',
      thumbnail: '',
      url: '',
    }); // Reset videoFormData
    setArticleFormData({
      id: '',
      title: '',
      author: '',
      readTime: '',
      category: '',
      articleCategory: '',
      url: '',
      status: 'published',
      createdAt: '',
      type: 'article',
    }); // Reset articleFormData
    setToolFormData({
      id: '',
      name: '',
      description: '',
      category: '',
      toolCategory: '',
      url: '',
      status: 'published',
      createdAt: '',
      type: 'tool',
    }); // Reset toolFormData
    setInterviewFormData({
      id: '',
      title: '',
      questionType: 'Question Bank',
      difficulty: 'Mixed',
      category: '',
      url: '',
      status: 'published',
      createdAt: '',
      type: 'interview',
    }); // Reset interviewFormData
    setCategoryFormData({
      id: '',
      name: '',
      description: '',
      icon: '',
      color: '',
      resourceCount: 0,
    }); // Reset categoryFormData
    setEditingItem(null); // Reset editing item
  };







  const renderCategoriesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Manage Categories</h2>
        <Button onClick={handleAddNew} className="bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <i className={`${category.icon} text-xl`} style={{ color: category.color }}></i>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#4285F4] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <i className="ri-edit-line"></i>
                </button>
                <button
                  onClick={() => handleDelete(category.id, 'categories')}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{category.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{category.resourceCount} resources</span>
              <span
                className="px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: category.color }}
              >
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResourcesTab = () => {
    const currentResources = resources[activeTab as keyof typeof resources] || [];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Manage {tabs.find(tab => tab.id === activeTab)?.name}
            </h2>
            <p className="text-gray-600">{currentResources.length} items total</p>
          </div>
          <Button onClick={handleAddNew} className="bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            Add {activeTab === 'videos' ? 'Video' : activeTab === 'articles' ? 'Article' : activeTab === 'tools' ? 'Tool' : 'Interview Resource'}
          </Button>
        </div>

        {/* Filter by Category */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all'
              ? 'bg-[#4285F4] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.name
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              style={{
                backgroundColor: selectedCategory === category.name ? category.color : undefined
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Resources Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    {activeTab === 'tools' ? 'Name' : 'Title'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    {activeTab === 'videos' || activeTab === 'articles' ? 'Author' : activeTab === 'tools' ? 'Category' : 'Type'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentResources
                  .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
                  .map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {activeTab === 'videos' && 'thumbnail' in item && item.thumbnail && (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-12 h-8 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {'title' in item ? item.title : item.name}
                            </div>
                            {activeTab === 'videos' && 'duration' in item && (
                              <div className="text-sm text-gray-500">{item.duration}</div>
                            )}
                            {activeTab === 'articles' && 'readTime' in item && (
                              <div className="text-sm text-gray-500">{item.readTime}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {'author' in item ? item.author : item.category || item.type}
                        {activeTab === 'videos' && 'level' in item && item.level && (
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${item.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                            item.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'}`}>
                            {item.level}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {categories.find(cat => cat.id === item.category)?.name || item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.createdAt}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#4285F4] hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, activeTab)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#34A853] hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <i className="ri-external-link-line"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  };

  const renderAddModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {editingItem ? 'Edit' : 'Add'} {
                activeTab === 'categories' ? 'Category' :
                  activeTab === 'videos' ? 'Video Tutorial' :
                    activeTab === 'articles' ? 'Article' :
                      activeTab === 'tools' ? 'Tool' :
                        'Interview Resource'
              }
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {activeTab === 'categories' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={categoryFormData.name || ''}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    placeholder="e.g., Mobile Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={categoryFormData.description || ''}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    placeholder="e.g., iOS, Android, Flutter, React Native"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Remix Icon class)</label>
                  <select
                    value={categoryFormData.icon || ''}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, icon: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                  >
                    <option value="">Select Icon</option>
                    <option value="ri-smartphone-line">Smartphone</option>
                    <option value="ri-laptop-line">Laptop</option>
                    <option value="ri-book-line">Book</option>
                    <option value="ri-video-line">Video</option>
                    <option value="ri-tools-line">Tools</option>
                    <option value="ri-article-line">Article</option>
                    <option value="ri-briefcase-line">Briefcase</option>
                    <option value="ri-chat-line">Chat</option>
                    <option value="ri-coding-line">Coding</option>
                    {/* Add other icons as needed */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color (Hex)</label>
                  <input
                    type="color"
                    value={categoryFormData.color || '#4285F4'}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, color: e.target.value })}
                    className="w-full h-12 border border-gray-300 rounded-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {activeTab === 'tools' ? 'Tool Name' : 'Title'}
                  </label>
                  <input
                    type="text"
                    value={
                      activeTab === 'tools'
                        ? toolFormData.name // If 'tools', use 'name' from Tool form data
                        : activeTab === 'videos' || activeTab === 'articles' || activeTab === 'interview'
                          ? (activeTab === 'videos' ? videoFormData.title : activeTab === 'articles' ? articleFormData.title : interviewFormData.title) || ''
                          : '' // For other resources, use 'title' field or empty
                    }
                    onChange={(e) => {
                      if (activeTab === 'tools') {
                        // Type guard for Tool: Update 'name' for Tool
                        setToolFormData({ ...toolFormData, name: e.target.value });
                      } else if (activeTab === 'videos') {
                        // Type guard for Video: Update 'title' for Video
                        setVideoFormData({ ...videoFormData, title: e.target.value });
                      } else if (activeTab === 'articles') {
                        // Type guard for Article: Update 'title' for Article
                        setArticleFormData({ ...articleFormData, title: e.target.value });
                      } else if (activeTab === 'interview') {
                        // Type guard for Interview: Update 'title' for Interview
                        setInterviewFormData({ ...interviewFormData, title: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    placeholder={`Enter ${activeTab === 'tools' ? 'tool name' : 'title'}`}
                  />






                </div>

                {activeTab === 'videos' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        value={videoFormData.author || ''} // Use videoFormData for Video's author
                        onChange={(e) => setVideoFormData({ ...videoFormData, author: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="e.g., Google Developers"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          value={videoFormData.duration || ''} // Use videoFormData for Video's duration
                          onChange={(e) => setVideoFormData({ ...videoFormData, duration: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                          placeholder="e.g., 12 hours"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                        <select
                          value={videoFormData.level || ''}
                          onChange={(e) => setVideoFormData({ ...videoFormData, level: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                        >
                          <option value="">Select Level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                      <input
                        type="url"
                        value={videoFormData.thumbnail || ''}
                        onChange={(e) => setVideoFormData({ ...videoFormData, thumbnail: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="https://example.com/thumbnail.jpg"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'articles' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        value={articleFormData.author || ''} // Use articleFormData for Article's author
                        onChange={(e) => setArticleFormData({ ...articleFormData, author: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="e.g., TechCrunch"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                        <input
                          type="text"
                          value={articleFormData.readTime || ''} // Use articleFormData for Article's readTime
                          onChange={(e) => setArticleFormData({ ...articleFormData, readTime: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                          placeholder="e.g., 8 min read"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Article Category</label>
                        <input
                          type="text"
                          value={articleFormData.articleCategory || ''} // Use articleFormData for Article's category
                          onChange={(e) => setArticleFormData({ ...articleFormData, articleCategory: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                          placeholder="e.g., Architecture, Trends, Performance"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'tools' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={toolFormData.description || ''} // Use toolFormData for Tool's description
                        onChange={(e) => setToolFormData({ ...toolFormData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        rows={3}
                        placeholder="Brief description of the tool"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tool Category</label>
                      <input
                        type="text"
                        value={toolFormData.toolCategory || ''} // Use toolFormData for Tool's toolCategory
                        onChange={(e) => setToolFormData({ ...toolFormData, toolCategory: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="e.g., IDE, Framework, Library"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'interview' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                          value={interviewFormData.questionType || ''} // Use interviewFormData for Interview's questionType
                          onChange={(e) => setInterviewFormData({ ...interviewFormData, questionType: e.target.value as "Question Bank" | "Study Guide" | "Practice Exams" | "Technical Guide" | "Scenarios" })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                        >
                          <option value="">Select Type</option>
                          <option value="Question Bank">Question Bank</option>
                          <option value="Study Guide">Study Guide</option>
                          <option value="Practice Exams">Practice Exams</option>
                          <option value="Technical Guide">Technical Guide</option>
                          <option value="Scenarios">Scenarios</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <select
                          value={interviewFormData.difficulty || ''} // Use interviewFormData for Interview's difficulty
                          onChange={(e) => setInterviewFormData({ ...interviewFormData, difficulty: e.target.value as "Beginner" | "Intermediate" | "Advanced" | "Mixed" })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                        >
                          <option value="">Select Difficulty</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Mixed">Mixed</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}



                {activeTab === 'videos' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={videoFormData.category || ''}  // Default to empty string if no category is selected
                        onChange={(e) => {
                          const selectedCategory = e.target.value;
                          setVideoFormData((prevState) => ({
                            ...prevState,
                            category: selectedCategory,  // Update category properly
                          }));
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>

                )}

                {activeTab === 'articles' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={articleFormData.category || ''}
                        onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'tools' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={toolFormData.category || ''}
                        onChange={(e) => setToolFormData({ ...toolFormData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'interview' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={interviewFormData.category || ''}
                        onChange={(e) => setInterviewFormData({ ...interviewFormData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}


                {activeTab === 'videos' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                      <input
                        type="url"
                        value={videoFormData.url || ''}
                        onChange={(e) => setVideoFormData({ ...videoFormData, url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={videoFormData.status || 'published'}
                        onChange={(e) => setVideoFormData({ ...videoFormData, status: e.target.value as "published" | "draft" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'articles' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                      <input
                        type="url"
                        value={articleFormData.url || ''}
                        onChange={(e) => setArticleFormData({ ...articleFormData, url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={articleFormData.status || 'published'}
                        onChange={(e) => setArticleFormData({ ...articleFormData, status: e.target.value as "published" | "draft" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'tools' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                      <input
                        type="url"
                        value={toolFormData.url || ''}
                        onChange={(e) => setToolFormData({ ...toolFormData, url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={toolFormData.status || 'published'}
                        onChange={(e) => setToolFormData({ ...toolFormData, status: e.target.value as "published" | "draft" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'interview' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                      <input
                        type="url"
                        value={interviewFormData.url || ''}
                        onChange={(e) => setInterviewFormData({ ...interviewFormData, url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={interviewFormData.status || 'published'}
                        onChange={(e) => setInterviewFormData({ ...interviewFormData, status: e.target.value as "published" | "draft" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent pr-8"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </>
                )}

              </>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <Button
              onClick={() => setShowAddModal(false)}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 whitespace-nowrap"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap"
            >
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/admin" className="text-[#4285F4] hover:underline">Admin</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-600">Resource Management</span>
          </nav>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Resource Library Management
            </h1>
            <p className="text-gray-600">
              Manage categories, videos, articles, tools, and interview resources for the community.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-folder-line text-xl text-[#4285F4]"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Video Tutorials</p>
                  <p className="text-2xl font-bold text-gray-900">{resources.videos.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <i className="ri-video-line text-xl text-[#EA4335]"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Articles & Guides</p>
                  <p className="text-2xl font-bold text-gray-900">{resources.articles.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="ri-article-line text-xl text-[#34A853]"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tools & Resources</p>
                  <p className="text-2xl font-bold text-gray-900">{resources.tools.length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <i className="ri-tools-line text-xl text-[#FBBC05]"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'categories' | 'videos' | 'articles' | 'tools' | 'interview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                      ? 'border-[#4285F4] text-[#4285F4]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'categories' ? renderCategoriesTab() : renderResourcesTab()}
            </div>
          </div>
        </div>
      </section>

      {renderAddModal()}
      <Footer />
    </div>
  );
}