import { TokenService, UserService } from "@loopback/authentication";
import { BindingKey } from "@loopback/core";
import { User } from "./models";
import { Credentials } from "./repositories/user.repository";
import { PasswordHasher } from "./services/hash.password";
import { RoleService } from "./services/role-service";

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = "123myfavoritesecretforvideogamesclub321";
  export const TOKEN_EXPIRES_IN_VALUE = "1h";
  export const REFRESH_TOKEN_SECRET_VALUE =
    "123myfavoritesecretforvideogamesclubOTHER321";
  export const REFRESH_TOKEN_EXPIRES_IN_VALUE = "24h";
  export const REFRESH_TOKEN_ISSURE_VALUE = "ClubVideojuegos";
}

export namespace AdminDataConstants {
  export const ADMIN_NAME = "Osmel";
  export const ADMIN_LASTNAME = "Nodal Pomares";
  export const ADMIN_USERNAME = "admin";
  export const ADMIN_EMAIL = "osmel.nodal@jovenclub.cu";
  export const ADMIN_PASSWORD = "Osmel123.";
}

export namespace ApiVerssionConstants {
  export const API_V1 = "/api/v1";
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    "authentication.jwt.secret"
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    "authentication.jwt.expiresIn"
  );
  export const REFRESH_TOKEN_SECRET = BindingKey.create<string>(
    "authentication.jwt.refresh_secret"
  );
  export const REFRESH_TOKEN_EXPIRES_IN = BindingKey.create<string>(
    "authentication.jwt.refresh_expiresIn"
  );
  export const REFRESH_TOKEN_ISSURE = BindingKey.create<string>(
    "authentication.jwt.refresh_issuer"
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    "services.jwt.service"
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    "services.hasher"
  );
  export const ROUNDS = BindingKey.create<number>("services.hasher.rounds");
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, User>>(
    "services.user.service"
  );
}

export namespace RoleServiceBindings {
  export const ROLE_SERVICE = BindingKey.create<RoleService>(
    "services.role.service"
  );
}
