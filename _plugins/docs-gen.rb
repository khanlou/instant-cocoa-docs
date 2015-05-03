module Jekyll
  class DocumentationGenerator < Generator
    safe true
    
    attr_reader :site
    
    def generate(site)
      @site = site
      generate_documentation_documents
    end
    
    def generate_documentation_documents
      all_raw_paths.each do |f|
        if File.file?(File.join(site.source, '/', f))
          add_doc_at_path(f)
        end
      end
    end
    
    def add_doc_at_path(filepath)
      docs_collection.docs << DocumentationDocument.new(site, Filepath.new(filepath), docs_collection).tap do |doc|
        doc.read
      end
    end
    
    def docs_dir
      "_docs"
    end
    
    def docs_collection
      @docs_collection ||= site.collections["docs"]
    end
    
    def all_raw_paths
      Dir["#{docs_dir}/**/*"]
    end
  end

  class DocumentationDocument < Document
    def initialize(site, filepath, collection)
      @site = site
      @path = File.join(site.source, '/', filepath.filepath)
      @extname = File.extname(path)
      @collection = collection
      self.data['layout'] = 'doc'
      self.data['permalink'] = filepath.permalink
      self.data['title'] = filepath.title
      unless filepath.is_index?
        self.data['category'] = filepath.category
      else 
      end
    end
  end
  
  class Filepath
    def initialize(filepath)
      @filepath = filepath
    end
    
    def directory
      dir_match = filepath.match(/(.*\/)[^\/]*$/)
      return dir_match ? dir_match[1] : ''
    end
    
    def filename
      File.basename(filepath)
    end
    
    def filename_sans_extension
      File.basename(filepath, File.extname(filepath)) 
    end
    
    def extension
      File.extname(filepath)
    end
    
    def category
      parts[1].split('-').map(&:capitalize).join(' ')
    end
    
    def permalink
      clean_dir = directory.sub("_docs", "docs")
      if is_index?
        clean_dir
      else
        full_path = clean_dir + filename_sans_extension
        full_path = full_path + "/" + "index.html"
        full_path
      end
    end
    
    def name
      filename_sans_extension
    end
    
    def is_index?
      actual_title.downcase.include? "index"
    end
    
    def title
      if directory == "_docs/"
        return "Instant Cocoa"
      elsif is_index?
        category
      else
        actual_title
      end
    end
    
    def actual_title
      name.split('-').map(&:capitalize).join(' ')
    end
        
    def parts
      filepath.split('/')
    end
    
    attr_accessor :filepath  
  end
end
