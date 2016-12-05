a boilerplate for Bolt Extensions to also supply a docs page on install.  


in your bolt extension you could have a backend page that provided docs.  

You'll need to use this HTML file to create a twig template. So currently for an extension in development the file structure would be similiar too:   

```
bolt-install  
  - extensions  
    - local  
      - vendor_name  
        - your extension  
          - templates  
            - backend.docs.html.twig
```  

In your ``web`` directory you'll need to place the `main.css`, the included [prism](http://prismjs.com/) css and js unless you want to include your own build or different code highlight library. For the details element you may also include your own polyfill. 



For instance: 

```php
// in your /src/ExtensionName.php
protected function registerBackendControllers()
{
  $config = $this->getConfig();
  
  return [
  '/your-extension-name' => new ExtensionNameBackendController($config),
  ];
}
```  

in your controller:  

```php 
// extension setup stuff
public function connect(Application $app)
{
  /** @var ControllerCollection $ctr */
  $ctr = $app['controllers_factory'];

  $ctr->get('/docs', [$this, 'callback'])
      ->bind('extension_name_docs');
      
  return $ctr;
}
``` 

Then a use can visit (in the backend)  

``site.com/bolt/extension-name/docs``  

and have a local docs section for your extension.  

-------------------------------------

**Browser Support**

This follows Bolt's admin interface browser support of IE 10+.