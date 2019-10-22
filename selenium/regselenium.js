
const webdriver= require('selenium-webdriver'),
      By = webdriver.By,
      until= webdriver.until;

// const geckoDriverPath = path.join(__dirname, "D:\chromedriver_win32"); // or wherever you've your geckodriver
// const serviceBuilder = new ServiceBuilder(geckoDriverPath);
const SeleniumDriver =  new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  SeleniumDriver.get('file:///D:/codes/try/signup.html');
  SeleniumDriver.findElement(By.id('fullname')).sendKeys('anub');
  SeleniumDriver.findElement(By.id('address')).sendKeys('lazimpat');
  SeleniumDriver.findElement(By.id('phone')).sendKeys('12345');
  SeleniumDriver.findElement(By.id('password')).sendKeys('12345');
  SeleniumDriver.findElement(By.id('email')).sendKeys('magaranub');
  setTimeout(function(){  SeleniumDriver.findElement(By.id('register')).click(); }, 10000);
 
 
  SeleniumDriver.wait(check_title, 20000);
  function check_title(){
      var promise = SeleniumDriver.getCurrentUrl().then( function(title){
          console.log(title)
          if (title == 'file:///D:/codes/try/login.html') {
              console.log('sucess');
              return true;
          }
          else{
              console.log('fail ---' + title)
          }
      });
      return promise;
  }