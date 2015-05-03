module Jekyll
  class DocumentationGenerator < Generator
    safe true
    
    def generate(site)
      docs_collection = site.collections["docs"]
      docs_dir = site.config['docs'] || './_docs'
      output_dir = "docs"
      all_raw_paths = Dir["#{docs_dir}/**/*"]      
      all_raw_paths.each do |f|
        full_path = File.join(site.source, '/', f)
        if File.file?(full_path)
          filepath = Filepath.new(f)
          doc = DocumentationDocument.new(site, full_path, filepath, docs_collection)
          doc.read
          docs_collection.docs << doc
        end
      end
    end
  end

  class DocumentationDocument < Document
    def initialize(site, full_path, filepath, collection)
      @site = site
      @path = full_path
      @extname = File.extname(path)
      @collection = collection
      self.data['layout'] = 'doc'
      self.data['permalink'] = filepath.permalink
      self.data['title'] = filepath.title
      if filepath.title != 'Index'
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
      if title == "Index"
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
    
    def title
      name.split('-').map(&:capitalize).join(' ')
    end
        
    def parts
      filepath.split('/')
    end
    
    attr_accessor :filepath  
  end
end
