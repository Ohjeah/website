task :delete do
  sh "rm -rf _site"
  sh "rm -rf .sass-cache"
  sh "rm -rf .asset-cache"
  sh "rm -rf _bib"
end

task :submodule do
  sh "git submodule update --init"
  sh "git submodule foreach git reset --hard"
  sh "git submodule foreach git pull origin master"
end

task :bower do
    sh "bower install --allow-root"
end

task :build do
    sh "bundle exec jekyll build"
end

task :default => [:delete, :submodule, :build]
