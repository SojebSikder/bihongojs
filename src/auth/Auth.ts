import jwt from "jsonwebtoken";
import { AuthOption } from "./Option";

/**
 * Auth class
 * @class Auth
 * @author Sojeb Sikder <sojebsikder@gmail.com>
 */
export class Auth {
  private static _config: AuthOption;

  /**
   * Auth configuration
   * @param config
   */
  public static config(config: AuthOption) {
    this._config = config;
  }

  /**
   * authToken middleware. using this authenticate using jwt token
   * @param req
   * @param res
   * @param next
   * @returns
   *
   * @example
   * // Example of authToken middleware
   * import { Auth } from "../system";
   * router.get("/profile", Auth.authToken(), controller.index);
   * // Example with callback function
   * import { Auth } from "../system";
   * router.get("/profile", Auth.authToken((err, data, req, res)=>{
   *  if(err) return res.sendStatus(403);
   *  req.user = data;
   * }), controller.index);
   */
  static authToken(callback?, options?) {
    const [apiToken] = options || [];
    return (req, res, next) => {
      let token;
      if (apiToken) {
        token = apiToken;
      } else {
        // access token from request header
        const authHeader = req.headers["authorization"];
        if (authHeader) {
          token = authHeader && authHeader.split(" ")[1];
        } else {
          // access token from cookies
          const cookies =
            Object.keys(req.signedCookies).length > 0
              ? req.signedCookies
              : null;
          if (cookies) {
            token = cookies[this._config.cookieName];
          }
        }
      }
      // if (token == null) return res.sendStatus(401);
      if (token == null) {
        if (callback && typeof callback === "function") {
          return callback("unauthorize", null, req, res);
        } else {
          res.sendStatus(401);
        }
      } else {
        // verify token
        jwt.verify(token, this._config.jwt.secret, (err, data) => {
          if (callback && typeof callback === "function") {
            if (err) {
              return callback(err, data, req, res);
            } else {
              callback(err, data, req, res);
              next();
            }
          } else {
            if (err) return res.sendStatus(403);
            req.user = data;
          }
          // next();
        });
      }
    };
  }

  /**
   * Generate jwt access token
   * @param user
   * @returns
   */
  static generateAccessToken(user) {
    // generate token
    const token = jwt.sign(user, this._config.jwt.secret, {
      expiresIn: this._config.jwt.expires,
    });

    return token;
  }

  /**
   * Generate jwt refresh access token
   * @param user
   * @returns
   */
  static generateRefreshAccessToken(user) {
    // generate refresh token
    const token = jwt.sign(user, this._config.jwt.refreshSecret);

    return token;
  }

  /**
   * Get decoded data from cookie using jwt token
   * @returns
   */
  static userByCookie(signedCookies) {
    let cookies = Object.keys(signedCookies).length > 0 ? signedCookies : null;

    if (cookies) {
      try {
        const token = cookies[this._config.cookieName];
        const decoded = jwt.verify(token, this._config.jwt.secret);

        return decoded;
      } catch (err) {
        return err;
      }
    } else {
      return null;
    }
  }
  /**
   * Get decoded data using jwt token
   * @returns
   */
  static user(apiToken?) {
    let token = apiToken || null;

    if (token) {
      try {
        const decoded = jwt.verify(token, this._config.jwt.secret);

        return decoded;
      } catch (err) {
        return err;
      }
    } else {
      return null;
    }
  }
}
