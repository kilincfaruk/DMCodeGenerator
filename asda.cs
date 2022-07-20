

if (Vehicle.BAND_TMF == "FH")
	return;
	
AntDictionary<string, AntList<string>> keys = new AntDictionary<string, AntList<string>>();

keys.CheckValue("33#0UYVB007").Add("33#4H203114");
keys.CheckValue("33#003MB029").Add("33#4H203670");
keys.CheckValue("33#0FEVB019").Add("33#4H203229");

keys.CheckValue("33#07MVB047").Add("33#4H203700");
keys.CheckValue("33#0E6VB057").Add("33#4H203700");
keys.CheckValue("33#0KWVB036").Add("33#4H203700");
keys.CheckValue("33#0Q1VB042").Add("33#4H203700");
keys.CheckValue("33#07MVB047").Add("33#4H203701");
keys.CheckValue("33#0E6VB057").Add("33#4H203701");
keys.CheckValue("33#0KWVB036").Add("33#4H203701");
keys.CheckValue("33#0Q1VB042").Add("33#4H203701");
keys.CheckValue("33#0HXVB028").Add("33#4H203720");
keys.CheckValue("33#0PLTB010").Add("33#4H203716");
keys.CheckValue("83#0C7T0002").Add("33#4H203514");
//keys.CheckValue("83#08UU0008").Add("83#AE000CQB");//taster yan duvara uygulanamaz 83.32423.0 ile düzeltilecek
//keys.CheckValue("33#0UYVB007").Add("33#4H203114");
// örnek kullanım : 
// keys.CheckValue("VKGR").Add("33#4H20365A").Add("34343434").Add("xyz");

StringBuilder sb = new StringBuilder();
keys.Each(row => 
{
	if (Vkgr.Code.Contains(row.Key) && Vkgr.Code.Contains(row.Value) == false)
		sb.Append(row.Key).Append(" ").Append("Kullanıldığında").Append(" ").Append(row.Value.JoinAs()).Append(" sapma ihtiyacı ortaya çıkmaktadır öncelikli satış grubu düzelttirilmeli veya duruma göre sapma da girilebilir.");
});

if (sb.Length > 0)
	Error(sb);




// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------



AntList<Ksta> kstas = Ksw.Code.Gets(Ksw.Code.KswCodes);

StringBuilder sb = new StringBuilder();

kstas.Each(ksta =>
{

	if (RegexHelpers.IsMatch(ksta.DESCRIPTION, @"mit(\s)"))
	{
	
		bool isOverride = false;
		Vkgr vkgr = Code.GetSerialVkgr(ksta.Owner.CODE, out isOverride);
	
		if (vkgr.IsNotNull())
		{
			bool match = RegexHelpers.IsMatch(vkgr.Text, "ohne|o.");
			if (match)
			{
				sb.Append(ksta.Owner.CODE).Append(" kodu ").Append(vkgr).Append("hatalı olabilir.");
			}
		}
	}
	
	if (RegexHelpers.IsMatch(ksta.DESCRIPTION, "ohne"))
	{
		bool isOverride = false;
		Vkgr vkgr = Code.GetSerialVkgr(ksta.Owner.CODE, out isOverride);
		
		if (vkgr.IsNotNull())
		{
			bool match1 = RegexHelpers.IsMatch(vkgr.Text, @"mit(\s)|m.");
			
			if (match1)
			{
				sb.Append(ksta.Owner.CODE).Append(" kodu ").Append(vkgr).Append("hatalı olabilir.");
			}
		}
	}

});


	if (sb.Length > 0)
		Warning(sb);

// ------------------------------------------------------------------------------------------------------------------------------------------


// Ve ile kelime arama 

if(Ksw.Code.Gets("Vxxxx").IsMatchFull(@"(?is)^(?=.*\b(teil)\b)(?=.*?\b(DSG)\b)(?=.*?\b(hinter)\b).*")
//-------------------------------------------------------------------------------------------------------------------------------------------

if(Vehicle.BAND_TMF == "FH")
	return;


if(Code.Contains("359BC"))//Geri görüş kamerası kodu
{

	if(Vkgr.CenterCode.NotContains("#06HM")) //#06HM Geri görüş kamerası satış grubu göbeği
	{
		Error("Geri görüş kamerası (Rückfahrkamera) satış grubu araçta eksiktir."); // Geri görüş kamerası araçta olmadığında uyarı verecek
	}
	
	if (Code.Contains ("00ACM")) //Gelenkbus kodu seçili ise
	{
	AntList<Vkgr> liste1 = Vkgr.CenterCode.Gets("#0M9T");
	AntList<Vkgr> liste2 = liste1.WhereS(t=> t.FooterCode.Left(1) == "0").ToAntList();
	
	StringBuilder sb = new StringBuilder();
	
	if (liste2.IsNotEmpty())
	
		sb.Append ("Geri görüş kamerası (Rückfahrkamera) kablo satış grubu seriden gelmektedir.Satış grubunda verlegung olmadığından kablo uzunluğu kontrol edilememektedir.Kablo planından yeteri kadar uzun olduğu kontrol edilmelidir."); 
	
	if (sb.Length > 0)
		Warning(sb);
	}
	
	if (Code.Contains ("00ACK")) //Solobus seçili ise
	{
	AntList<Vkgr> liste3 = Vkgr.CenterCode.Gets("#0M9T");
	AntList<Vkgr> liste4 = liste3.WhereS(t=> t.FooterCode.Left(1) == "B").ToAntList();
	
	StringBuilder sb = new StringBuilder();
	
	if (liste4.IsNotEmpty())
	
		sb.Append ("Geri görüş kamerası (Rückfahrkamera) kablo satış grubu KSW'den gelmektedir.Kabelverlegungta geri görüş kamerasının çekileceği nokta görülmelidir."); 
	
	if (sb.Length > 0)
		Warning(sb);
	}

	if(Vkgr.Code.ContainsAny("33#0M9TB075","34#4H200099")) // Eğer #0M9T varsa, hatalı satış grubu ve sapması araçta aranacak
	{
		if(Parts.NotContains("34254817295"))
	
		Error("34.25481-7295 numaralı geri görüş kamerası (Rückfahrkamera) kablosu araca eklenmelidir.");
	}


}
	
	



