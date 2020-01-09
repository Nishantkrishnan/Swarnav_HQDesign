import React from "react";
import {
  Grid,
  Card,
  Paper,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  InputBase,
  Input,
  IconButton,
  Typography,
  Divider,
  CardContent,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  closeButton: {
    // width: "18.7px",
    //  height: "18.7px",
  },
  input: {
   display: 'none',
 },
  cardStyle: {
    background: "#FFFFFF",
    borderRadius: "7px",
    borderRadius: "7px",

    height: "192px"
  },
  avatarCreatePost: {
    background: "#D8D8D8",
    border: "3px",
    color: "#FFFFFF",
    margin: "left",
    width: "45px",
    height: "45px",
    marginRight: "0.8%",
    marginLeft: "1.4%",
    paddingTop:'2%',
  },
  textBaseCreatePost: {
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    borderRadius: "31px",
    borderRadius: "31px",
    width: "450px",
    //height: "50px",

    marginLeft: "15px"
    // ['@media (max-width:381px)']: {
    //   width: '100%',

    // },
  },
  TextFieldCreatePost: {
    width: "inherit",
    fontSize: "16px",
    paddingLeft:'2.5%',
    ["@media (max-width:30em)"]: {
      fontSize: "11px"
    }
  },
  submitButton: {
    background: "linear-gradient(90deg, #E74A3F 0%, #E95B27 100%)",
    borderRadius: "18px",
    borderRadius: "18px",
    width: "125px",
    height: "35px",
    marginTop: "3%",
    display: "flex",
    color: "white",
    textTransform: "none",
    margin: "auto",
    ["@media (max-width:40em)"]: {
      width: "80px"
    }
  }
});
class CreatePost extends React.Component {


  render() {
    const { open, toggleCreatePostDialogClose } = this.props;
    const { classes } = this.props;
    return (
      <Dialog open={open}>
        <Card
        //  className={classes.cardStyle}
        >
          <CardContent>
            <Grid container style={{ fontSize: "16px", marginBottom: "2%" }}>
              <Grid item md={10} sm={10} xs={9} style={{ marginLeft: "3%" }}>
                <Typography
                  style={{
                    marginTop: "1%",
                    fontSize: "18px",
                    fontFamily: "Roboto Medium"
                  }}
                >
                  Create Post{" "}
                </Typography>
              </Grid>
              <Grid
                item
                md={1}
                sm={1}
                xs={2}
                style={{ textAlign: "end", marginLeft: "2%" }}
              >
                <Button
                  onClick={() => {
                    toggleCreatePostDialogClose();
                  }}
                  className={classes.closeButton}
                >
                  <i class="material-icons">close</i>{" "}
                </Button>
              </Grid>
            </Grid>

            <Grid container style={{ display: "flex" }}>
              <Grid item md={1} sm={1} xs={0} style={{ marginLeft: "3%" }}>
                <Avatar
                  className={classes.avatarCreatePost}
                  alt="suggest_user"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEBMVFRUWFRUVFRYVFRcVFRYVFRUWFxUXFRUYHSggGBslHRYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABEEAACAQIEAwUFBQYDBgcAAAABAgADEQQSITEFQVEGEyJhcTKBkaGxQlJiwdEHFCNysvCCouEWFyQzksIVNENTc5Px/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALSslEjWSrA3aaInU1AhYShnAYerVxPfVTTYVKmXS4Opl9eeb8STNWrdRVqf1GAkfQ2m6cleiZtaUDqmIbRSQJSPSNMHhiYEQpaiFvgiBmYhB95zYRbxTGWqClTdVNt76X87ch0lfGKGdUql6pUBtGvmc30F+W2vrAtZo0ySBWpm2+p/IQ/h/FRRW5qZ6ew3ILdFO/ytKlguM90xQJlzIQ2YWYNc7HpawivE8SrGmEz6DQrYZrg+lxeB6rU7UUlQMUNudiunzjqi61FDobggHodeo5TxbCVKy09hlU3BYjKDe5FuZ0jrst2gqLVu7E5m1ANgQdPeIHpjJIHEKpVlcafrI6lM9PjACcWk+A4y1E9V5qTofToZw9HqYJWpAcoD/FdraIF0RmPnZQPfrK3xHtZXbRMtMfhFz8TAsTTinE6b+7oYEeNxj1Dd3Zj+Ik/WSdm//N0v5j/Q0XVaghvZisDi6IB+0f6GgenKJIonKiSKIGwJu03abtA4tNzq0yAtWSrIUkoMDu80TNXmiYHLmefY6jatWOpvUc+niOkvzGVvGUEao7U9gbMVa/8AE1zgjqNBaBW61p3Rw4vrGFXCKxsRc9V0aS0eGfda/k2h+O0CCnSHLWTYxilF3Glhvpp56woYdl9pSPp8Yr7T1R3SqbWub3Nrg726m14FCx9QHxKb2tFj1DyMMx1QFv4Y8Nrf/vvk+A4K7i5FvWAr706am/Um5jTD4im26DNy1IF+p6/rC37ON0PrGvBOxzuQTcc9he3peBXMRRIFi+a1xa+3oJ3w58jAy+YjsTVB/h0yw5kjKST6xLxrsxUw4DVBlDH1I562gWfgHEHej4GIcDNe9ywF+Ub4Tjwbw1hlP3vsn16Si9n6+QsoY+JCB7xYjzEZCoecC7s4Oo1HlAMVVA3MWcAJJYXNrAgX84XisLrAWYvGjlrE+KrM2ltDH1TBXgz8OgUJ8Yxq5cosrZeZJ1tuTLh2XwtsZSPRm/oaAp2VIqZw7WzZstx1v0lr4JhLV0a3M/QwLmskEjWSCB2Ju00JuBq0ybmQFKmSAyFDJAYHd5yxmiZyzQOXMrzimhdRpeo7EXv4ma5P+nKPXaUPH4LGVa9Tu6ZC52sx0W1zreBYaNm22h9ALbf46ynpg8Ui2ZEJvcVASWUDe2oFvUR9w7COwBZifl9IDtKgGgPu3HwMp/7RqN6SMosAzbaC9vlzlxw2Atyi7t7hB+4VCRsyHT+a35wPOex3ABXvUbZWtbqbX+EveG4XrlttAuwLJh8FVxFXbvCFtu2UW0Hrf4SL/a+ozfw8O5F9yNIFvw3BgADaNcHgBaxAPuirhfGs6C+hPLzmuMcarU1/gKhN9c5IHutAtNOkBsLSr/tFoqcPYjc2g/Du0mLYeNKV+iNf45iLRjxLieGqocPjL0WceHONCeTI4upI00veB5PwKhqxsbDb1b/SNykP7NcOalXrriadiq5WuNLkgqRbQ+Gx98n4uieHILe1fz2gT9nKWrfyj6x5Uw94B2XS9/5R/VLAyQFRwkifDRhjMWKQzEDUEC65hmtcDfna14TjWV8pUWsOlhr0gIDhpLgqVqi+v5GFOs4orZx/fKA2UyQGQKZIDAmBm5GDN3gdzJxebgJVaSBoKrzsPAnJnLNI804ZoGO0cUqa90pJF8vXqIgqPFWKqKSRUqV2F7BA4poN9PAuYjTm0BvUpXU+hHyjLguD8K6chEmBZ7ZVXTYAknKLWtfUn3ky58OQKoDWBtt/pAJo4AdR7pB2g4ItfDVqOpLoQNQPENV15agQ1HB2kgYwPGeDq64Ud6pstSqqU91Qq/iP4mJLG/S1pwiVnqAOmVMtwftA2NgRew1tt1lxwWFS1VKgsBiK17/ZbOSL9AVKa/rCBwRRqPidresCs8A4Yz4mnTrFghps4yOynMjKNWU3OjD4fBrxHgdSrXrUwTZFoNTBJPhbvBU8RNySUA8hbrHHDQj1+8T2Ka5FPJmJu5B5jRRfyjyvR8QqKLkCx81Nri/uBgUjhPZXI1RqhfxggC/s3IPhN9LWt6ExzW7Ooy0FqXcJXR0D+L2QSd/IH4RzTx9O5GuYGxFjeEB7+I6W9kdL7k+cCn8SwyCpiso8QdOZ2dENre4xFjV0W/VvossmKA72u3N3Vf8AoQfr8ot4nhb5AOZb/tgE9kl9r+Uf1SymnEXZilleop5Kv1lmywAMVg1cZXFxOKicoe6waqIC6qkHX2hDK0DO4gGI0kDwVXnYeASGnWaCh5vPAJzTINnmQEq1JItSL1qSVakAzPOGeQ55ovA27Tusid02YK4I2GjXIvbNcgG/PLBnabHDARmPercXvkdlPPS11sTf5ddAOxFLEvST93/hIVAt7T7facW6cli7gBfD4hXqMGXP3VQhrkFzbUNY6EAmNuHNlWwrKLA6ZihXfQroDttbnvF1bAvVutOmzlmY5xoASSr35C5APtQLvxPHGgofLmuQDra2h/SdcP4iKqhxpflFPFsTUXDIlVR3pChrEHUbnz2+cI4fTAAAFh5QIeLVBSrk7CsgP+NPCfeVK/CVrjGPpU1LFUB62G8tHanh7VsOe7/5qEPT822K38wSJ5njiMVSysSGRgWGxBXQgwDqnb0UVpoiFxbUg+f1jUdvarsi06FRQQNXG/pEHB+E9296hWpTIFg+mU3GxHlPQ8PVwygZaScrEnN9YFb7RcfFF0qEWLWLWYFhfqu9vOWjDY+9NXvoVBB9ReBcbwOHZKlZ0VmKkZiBoOVpXuK8bApUqFJgHcKg/Dewv7oFq4BWVkZyoIqVHbUcgcot8J1xNEzIVFt/ymwyqqIgIVEVBf8ACLXgHEcRYp7/AMoE/BjfE1v5V+ssGWVrs2+avVP4F+olotAhZYPVWGPBqogLq0Aq7xlXWLcXtA0Hm88E7yZ3kAvvJneQLvZrvYB3ezID3syAmWrJlqRatSTLUgHipOs8DWpOg8Cdmjfh3FaiqMqAhVsfD0/EYizQTiOJtlS2+vvvYe7eBfMPxatVOXu6JFmIBfMdN7i2nwjjCsALKEFuS6Lc7jQdeYEofD+MLTIFOnbwke1pue8O25sZZOHcQuneMVReewI9DAKxeEIOaoRUqNcAAWVVHS8JwK3VD1F4BW4kAGdadSotvaykHKOWvKKG7XilRJWhUuuwfKt99bXvAudYALcmwGUkk6bieMftJxqLjnqYQqLohe3s1CRqw5Xtb1jTivFcViKHfuwVCTlU3OgNvClrDXTWefdoapeoSb+ErfrYqBt6wLJ2f44tVClQ2I+Y8o34ZwZGJapiKlgQQuewtPN1wrjVT7xClOJbTvDr5wPS+1XaCitAJTbXTTrKzgcPVFLE4ohhUp0c6NbRLMp0vzIv7oR2V7OXs1Ql25X1US4cZw6UsJVQfaQhj1uLQM7J8V/fqQYZVqAhXUkDxdRfkd5nHQVyg7guPhaUzsPX7pVZhmV1ZWXrl8QI87Xllxn7zUrotEs9MqHpsMuUgmzLU00Zbam+vSA67G61Kh/Av1lvtKtwGkwJ8eWpbxAU1ykA6DXeNMVxN6K56ih0HtMgysnmVJNx6QGbCD1FkuFxC1UDobg+Vj6WizH8cw1I2eqoIIBtc2J5G0DqsIp4itlMc1CCAykEEXBGoI8on4t/y2/vmICfvJyasHNSRNUgFGrOe9gbVZwa0A7vpuLu9m4C5HkyVICjSZXgHK8lV4EjSZGgFBpzWSi2UljmW2mnw3nAaCCtlLaWuSfnvA3xDFvTS1Gma1R2OVdgoOrZj02HvkfCe1tTD1AMZRK7DNbMgHkdcsXYvg9GsS2Zg51zFifzi3EUcRQILE1FHMe1l6MNnHzge04THrWQVKBBa23UH+/SQ1+BYfEjvGDL98KxGo3Fjt/rPMeD8cGFZKtFr0mNmX7hO9ug6ien8PxJLFk1FRcwHLMPte8EfCBVe0r06VsMfZAugG5HID0lCq0h+8snIrlt6AH8p6n2x4IlbI7bi+xK2vb7U8o4hhHwmMBqMzKGvdjclSLannYH5QCcPh2pnKRpy9I5w2DvYlCR1EfUKeGq913VySpz8xmtoQfj8o7wyhF0EAbg1ZVAVVI9YN2qxJFFgTuLD1OgjeriABmAlQ7U4vvCqiwG7MdBf7IHU/rAW06gp0kOwRlvyGuh198sXAONMtVaNBlbO33w3qbX0NpV+KYlXanh2SwYqWA00UXHzF4z7HcPWniGcraxCrflrqbQPRcfsK4BUpqw6jZh/fSCdo8ZbD1bbFUN77guoI+F4bXrKCQdiMwvs1xqLfCUrj+Iy4OqjHVQwB8ka63F97CBPwXtBUHeAOwUkgC/K2W46HTeQ8P4ZQxGaktWojA3Qk57sb30tqf1lHwPE29infMbXtv1sIwp416Rsp8XNhyPl+sC/wDYLEVFWtg8QQamHc2I2NNibb+YPxjPjgtTb0H1E874bjK4q99Scmqw7s31JJvlv11Pyj/B8cxFalXp4ikS1IhGqqLLmuNGU7H0+UAdqkhepI2qSCpUgStVkZqwdqkharAM72ZAe8mQNK0mRoKpkqmAWjSZGgitJkaAWrSpcWxZNRwwBAYgLqb2O510lpQyulKfe1O8W3jYg3Oup5QFiVAuvdWH4Cyn4qY3o4sOt0YkfaV7ZlPIhv1hlKhTb7DEdRFuIwL02z0/hbRh5g7QF2MXuywIurD4no3nvrL1+z7irNTRGc3pnL6pbT5WlTxWEL0yQNBqV3K9Sh3IHT4Qz9nmIZKjN91hz5a6fSB6hi8Yh/hr4iNSb2Cn6SpdpeDrWUOFNxob225m8dYivqcqhGYgmwFveQJxROYlSbnn7txrA8t4hw2phz4WcKTyJBBGx03jqh2nxeGW9ZRWpH7ezC/3iNL+ssvGOGh0dQALajS2vIX5yp8JxIVjRrC6N4denMQGWM7Xq1IvRJc2F1IsUP4h08xcecj7MYJ6rrVrMWYksByUfhB0vK1xbALhq7oAWFrob2tmGl+ov8Za+zOKLlSuhC+zvtv6QCMDhFbGlzsoIHW7R1iHFOoHJIUm1lAvc7Ene8Fwi/xHJXXkzWJ0G/QSXiaBlvfTSx0Gtup6WgGHtD3Ssr02cIbjUBgD59JXO1GKUUahXUPTzrfXQ6EeovCMRWDotVlBIvTqDqp5jpzlU4pjMlF8M2pR/wCG3Lu2sbXgAcJxfdHNpsbnzOwEYrxtT9m8SmtQFvbe3L2RfnruYdg+LUhtSC26an1uYDSlirkMCVt8PjHVLtRVYfu6ZTTdiXYr4ma175r/AIRylUepmOjBr7a/USfhZC1VGYak6edjAsjvBqjzpzB6hgcu8iZ5pzImMCTPMkN5kAsSRZoLOwsDpZMkjAkiwJ0MQYnEUlqt3j2OY2A1O/MCP0iguiVGsFuWJOw1vzOpMDeG4pRXbvbc/wCE9jGOHx9Cr4VcHquax+BmU8W2W6lb9Cp+pYTivTSppWRb8m2P+GoNj74GLUpoxGbIR9l+foYuwzpQqEglQzE+HkNrAjlDcXgQUysS4B8LEWdfwt19YpwVK7WP2SQDzBFwD8hAtL8QX2r8vDr79bzvDYgnKwuAdxYDX+7RJSoVHNltpyJ0ueem0sGFTUBaikZVCr4dX0zHQXtoYBGNYsCL7WJ538vIaSm8XpHvQwGmhGnLnLtXwRsbEAa+G+hJ6/KLcXw1nFso9xtb384CTtlg8y0K42K5DYaDmv5zvsZa7AgXAzA21F9D84fiuFuKFSmxuoUsltsy66/OJuytS2Jpi5s90J/mF1/zAQLCDa5PI3Otjr5DYRhVdWTMBcWANgTa3M33m8VwYMc17He4vcnkdZLgqWXwtex0JOl4CUOSXVbqHBBvyI1lI4zQJN9zbLpfltv5T0XH4II4YC4BzA7j3GV/jOCvVItYMVZed83T6QKJRor9s2HkLwum1LZQW+Qnq/AOw+CaoKlRC/dlgylgaTvfbLb7O1r2JEfdqey+ExiAd2KVRRZalNVUgdCLWYQPEEDHwpZV5kD6dYw4Rw494HQM4S5ZtSF0tqRoN56NhOw+EpAZy9W3JiFX4KB8zCOLlFoNTpKqqALBQFG45CBTXg7wpxBnEAd5EYQyyMrAitMkmWZAZBJ0Fk4pzYpwIgs7VZIEnYSByqzfBuyBrVGq4hytMuSqUzZnBJsWf7I8h8ZKqSwYKp4VHQD6QG/D+C4CmLJhaPmSisx9Wa5hVLgeD5Yemvoth8BFdDE62BjCjX5mBO3Z3BnanlG1lJAtIx2NwO+Q3P4uvuhCVYQlXWAAvY/DL7OYX8wfyg6dj6aMTTYC/Veu+x3j01Z0KsBDU7PP9lk+f6SJOztQfc+J/SWQVJsVBArdTgFQgr4dQRvyOnTSU7Bfs1xCMH71AyOrKNSLKb78jtynqhYSMmBWeJUalMBQVzucqgXNre023IfO0npdnFYhqhZjzJZlO2uULr8x6SPj/EEoYnDPUt3ZFRWPNb21Hy+Ef0j3hBpkMDbKwII1/swAsP2TUL/CqPTIvoGYqxPJgxOh9YFw7g1JWDMMz0zcA2st78rf2RLhXxFOit3YKAN2PzMpXDuNnE4qoaetFVChrkK1iSGtzuS1vLWAzp0kpjKihRcnTmWNyT5kyN6knq67RfWDchaBzWb+zK/xiqMpAI16esYYlW53inGU/Cf75wETpIGSMGpyFqUABqc4NOHmlOTSgA93MhvdTIDAU50KcLFKdClAEFObFOF91OhSgCinC6D20mxSlfr8UC1HXoxHwJgWylU1EMWvtKlheLxzRxQIgPKeM1haYqIFO1pJTqmA/GKmxiomWpJg20Bp+9za4nzikkzqk2vzgNXxFpjYgQAPprN3EBL2zwH7zTAB8S3K+spfBsRjqY8RZbdKliLdQLgz0eoV6yudoq9OmM52sfQ2tAq3FUxVS71apZBqad2KvbWzAWvPR+xNT/hVqVUyPU8TKRYi2i6ctAJ5T/tMDdSt12vL92aXFVaCOqXUjwkHexIv8oFvq23UwGvWtEGM4s9HSsr0ydsylb8tL7wUcXB1LQGeIxRG14BVxGYWPOC4nitMDeLcHj89ZFB3P5GAzanIzSjA05yaUBf3M13MYd1M7qAv7majHupkAkUp0KUICTsJAGFKdClCQk6CQBRSnlnGnIxNb/5X/qM9fCQJuy2BqOXqUSXY5mPeVACTqTYNaB5pw/E9ZaMBVuN5DiezyVeL/u1MZKACu6ppZBTBNj5sR8TLiewOBO3er6VW/WAtw9ddLtCVxKC/iEm/3cYX7NWsP8bH/um/921HlXq/9bfrA0uNpjcic/8AidMbsJt/2Z0z/wCtU/8AtYflIh+y+mDfOzetVj9YGDiyMbLr6an5QzD96xuKeUcsxA/1huC7MPSFl1A6sDGNPhrjdD7mEAKlw4n26yr1AVm+ZtDqXC8P9qoze8L9BOzgW+4fjI2wTfdMA2hgMMvsop8z4j84H2m4DSxiIrNlKElTlVgL2vdTboJC2HI5Ee6bQgb/AAgK17A0iMr1Ft+Cm6t8TWYf5ZZOE8PpYSglCmSEQG2dhfUliSdOZM8p7fcQxC4gqjnu2RbIrMGQruRYje+t/KUuqpyDOTcksWLlifIXgfQXEOK4axWrUokc1ZkYfAyh8XwvCarHu6q025ihUv8A5LMJ5qeI5fAHOXlYC493P4xbisTma5IJ62IPvgXKpgMCxsnEGHQMoHzIAjXgvZdKbrWFZ3y6rooU3BHK+ms884Vgmr1VpqdDufuqPaP98yJ7DgnRVSkgsAAq+gGn0gSmnM7uEZZvLAG7uZ3UJyzMsAXupuFZZqBtVkgWaWSLAwLOgs2BOwIHIWDd94iPMw4CI69Wztfkx+sA3hGFAxVevzZKVMeirc/WWKm0Q8INkBO7kuff7P8AltGtJ4DFDJ1MCptCEeASpnQkStO7wO7zd5xebvA3eZec3mrwOryJ8Op3Anc0WgKOKdmMLXOZ0s/J1JDA8iOXxnnnanscR4bAM3snajW8h/7VX8J0PLpPVy0HxdNKilKihlYWKnY/31gfM/EOGmkSCDobEHRlPRh+cBLz2Ptb2bCjM12pjRa1r1KQ5LWA9tPxbjn1nnXFOz7LcpuACVGoIP2kI3EA7sDTH8VzvdEHzY2+XwlzwhHep69fIxZ2Pw9PC4W70w1ardvELhFIAXTrbX3ybh1f/iEHUn+kwLWJ0BOAZIIGWm7TBNwObTc3MgQo0mUwRGkqtAJUyQGDqZIDAnBlWxniquo+05X4tr8pZQ0rdPXEVD91m+JJ/K8B5Sf+/pDKNSK6bwuk8BrTeFU3iyk8LpNAPVpIrwRDJlMAkNMvIgZ1eB3eYTOM00TA2WnLNNMZGzQNs0hqPMdpA5gaep11GxHL0MoHansqylq+ANjbx0eRAN/4fTcm3mbdJdarGCtUIgUridNu7BR72Go56abxbwSqTiKV/vH+lobx+q1B2yU2yHUX2F97HpFXAsMWxNOqbaM1gPNWFxA9CDSQGDgyQNAmBmXkQaZmgS5pkhzTcCuiSCZMgdiSCZMgdCJqP/Mq/wA5/OZMgGJCKcyZAJSE05kyBOsmWZMgdrMmTIGTZmpkDkzh5kyBG8iMyZAieC1ZkyBWO03s/GLOzvtJ7/zmTIFsE6mTIG5qbmQNTJkyB//Z
"
                />
              </Grid>

              <Grid
                item
                md={10}
                sm={10}
                xs={8}
                style={{ display: "inline-flex" }}
                className={classes.textBaseCreatePost}
              >
                <InputBase
                  multiline
                  className={classes.TextFieldCreatePost}
                  placeholder="Whats on your Mind??"
                ></InputBase>


        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button  component="span" style={{backgroundColor:'transparent'}} >
             <i class="material-icons">photo</i>
          </Button>
        </label>
              </Grid>
            </Grid>
            <Button className={classes.submitButton}>Post</Button>
          </CardContent>
        </Card>
      </Dialog>
    );
  }
}
CreatePost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreatePost);

