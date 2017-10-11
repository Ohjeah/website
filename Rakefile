task :delete do
  sh "rm -rf _site"
  sh "rm -rf .sass-cache"
  sh "rm -rf .asset-cache"
end

task :submodule do
  sh "git submodule update --init"
  sh "git submodule foreach git reset --hard"
  sh "git submodule foreach git pull origin master"
end

task :bower do
    sh "bower install"
end

task :build do
    sh "sass --style compressed assets/scss/styles.scss:assets/css/styles.css --sourcemap=none"
    sh "jekyll build"
end

task :default => [:submodule, :delete, :bower, :build]
