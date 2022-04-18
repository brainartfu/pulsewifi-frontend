if (localStorage.getItem("token_expire") == "0") {
    window.location.href = "/login";
}
const refreshTokenIntervalVar = setInterval(() => {
    if (localStorage.getItem("token_expire")) {
        if (localStorage.getItem("token_expire") > 10) {
            localStorage.setItem(
                "token_expire",
                localStorage.getItem("token_expire") - 1
            );
        } else {
            $.ajax({
                type: "get",
                url: `${api.url}auth/refresh`,
                headers: { Authorization: localStorage.getItem("token") },
                success: function (response) {
                    localStorage.setItem(
                        "token",
                        response.data.token_type +
                            " " +
                            response.data.access_token
                    );
                    localStorage.setItem(
                        "token_expire",
                        response.data.expires_in
                    );
                },
                error: (e) => {
                    window.location.href = "/login";
                },
            });
        }
    } else {
        window.location.href = "/login";
    }
}, 1000);
