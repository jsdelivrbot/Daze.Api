module Daze.Api.JsonHelper

open Newtonsoft.Json
open Suave.Json
open System.Text

let utf8GetBytes (str: string) = System.Text.Encoding.ASCII.GetBytes(str)

let deserialize<'a> bytes = JsonConvert.DeserializeObject<'a>(System.Text.Encoding.ASCII.GetString(bytes))

let serialize<'a> x = JsonConvert.SerializeObject(x) |> utf8GetBytes

let mapJsonNet<'a, 'b> = mapJsonWith deserialize<'a> serialize<'b>

