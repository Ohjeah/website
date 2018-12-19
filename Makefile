NPM = npm
BUNDLE = bundle
JEKYLL = bundle exec jekyll

BUNDLE_DIR = .bundle
NPM_DIR = node_modules
VENDOR_DIR = src/_assets/vendor


bib:
	mkdir -p $(VENDOR_DIR)/bib
	wget https://raw.githubusercontent.com/Ohjeah/bibliography/master/references.bib -O $(VENDOR_DIR)/bib/ref.bib

bundle: Gemfile Gemfile.lock
	$(BUNDLE) config 	jobs 8
	$(BUNDLE) install --path $(BUNDLE_DIR)

npm: package.json package-lock.json
	$(NPM) install

install-assets: bundle npm bib
	mkdir -p $(VENDOR_DIR)/js
	mkdir -p $(VENDOR_DIR)/fonts
	mkdir -p $(VENDOR_DIR)/css

	cp $(NPM_DIR)/jquery/dist/*.js $(VENDOR_DIR)/js/.
	cp $(NPM_DIR)/academicons/css/academicons.css $(VENDOR_DIR)/css/.
	cp $(NPM_DIR)/academicons/fonts/* $(VENDOR_DIR)/fonts/.

serve: install-assets
	$(JEKYLL) serve

build: install-assets
	$(JEKYLL) build

dist-clean: clean
	rm -r $(NPM_DIR)

clean:
	rm -r .jekyll-cache
	rm -r $(VENDOR_DIR)
