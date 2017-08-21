namespace Common.Serializers

open System
open System.Reflection
open Microsoft.FSharp.Reflection
open Microsoft.FSharp.Core
open Newtonsoft.Json


type Int64ToStringConverter() =
    inherit JsonConverter()

    override this.CanConvert(t) =
        Type.GetTypeCode(t) = TypeCode.Int64

    override this.WriteJson (writer, value, serializer) =
        let v =
            if this.CanConvert(value.GetType()) then
                box (string value)
            else value
        serializer.Serialize(writer, v)
    override this.ReadJson(reader, objectType, existingValue, serializer) =
        serializer.Deserialize(reader, objectType)

