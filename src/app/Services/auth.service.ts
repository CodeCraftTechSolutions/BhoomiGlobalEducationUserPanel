import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import ls from "localstorage-slim";


@Injectable({
  providedIn: "root",
})
export class AuthService {


  signIn(socialAuthService: any) {
    throw new Error("Method not implemented.");
  }

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn() {
    if (ls.get("token")) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  get checkIsLoggedIn() {
    if (ls.get("token")) {
      return new BehaviorSubject<boolean>(true).asObservable();
    }
    return new BehaviorSubject<boolean>(false).asObservable();
  }


  public user: BehaviorSubject<string> = new BehaviorSubject<string>("");
  get username() {
    if (ls.get("user")) {
      const userDetails = JSON.parse(ls.get("user") ?? "");
      var username =
        userDetails.firstName !== ""
          ? userDetails.firstName
          : userDetails.email;
          console.log(userDetails)
      this.user.next(username);
    } else {
      this.user.next("");
    }
    return this.user.asObservable();
  }


  public userImage: BehaviorSubject<string> = new BehaviorSubject<string>("");
  get profileImage() {
    if (ls.get("user")) {
      const userDetails = JSON.parse(ls.get("user") ?? "");
      this.userImage.next(userDetails.imagePath);
    } else {
      this.userImage.next("");
    }
    return this.userImage.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  logout() {
    var cookie = ls.get("cookieConsentStatus");
    this.loggedIn.next(false);
    this.user.next("");
    ls.clear();
    if (cookie == "allow") ls.set("cookieConsentStatus", cookie);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["/"]);
  }

  

}
