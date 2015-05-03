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
      docs_collection.docs << DocumentationDocument.new(site, FileInfo.new(filepath), docs_collection).tap do |doc|
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
    def initialize(site, file_info, collection)
      @site = site
      @path = file_info.full_path_with_parent(site.source)
      @extname = File.extname(path)
      @collection = collection
      self.data['layout'] = 'doc'
      self.data['permalink'] = file_info.permalink
      self.data['title'] = file_info.title_for_display
      unless file_info.is_index?
        self.data['category'] = file_info.category
      end
    end
  end
  
  class FileInfo
    def initialize(filepath)
      @filepath = filepath
    end
    
    def full_path_with_parent(parent)
      File.join(parent, '/', filepath)
    end
    
    def directory
      File.dirname(filepath) + '/'
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
      titlify(parts[1])
    end
    
    def permalink
      if is_index?
        normalized_dir
      else
        normalized_dir + filename_sans_extension + "/"
      end
    end
    
    def normalized_dir
      directory.sub("_docs", "docs")
    end
    
    def name
      filename_sans_extension
    end
    
    def is_index?
      title.downcase.include? "index"
    end
    
    def title_for_display
      if directory == "_docs/"
        return "Instant Cocoa"
      elsif is_index?
        category
      else
        title
      end
    end
    
    def title
      titlify(name)
    end
        
    def parts
      filepath.split('/')
    end
    
    def titlify(string)
      string.split('-').map(&:capitalize).join(' ')
    end
    
    attr_accessor :filepath  
  end
end
