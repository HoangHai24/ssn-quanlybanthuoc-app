package com.kynguyenso.quanlybanthuoc;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // Import this to run splash screen
import android.os.Bundle; // Import this to run splash screen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "quanlybanthuoc";
  }
  // Add this method to run splash screen.
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          SplashScreen.show(this);
          super.onCreate(savedInstanceState);
      }
}
